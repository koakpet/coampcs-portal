import {NextResponse} from "next/server";
import {Readable} from "node:stream";
import pool from "@/lib/db";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import {getGoogleDriveClient} from "@/lib/googleDrive";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request) {
  let drive;
  let uploadedFileId;

  try {
    // 1. Confirm that the member is logged in.
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {message: "Please log in first."},
        {status: 401},
      );
    }

    // 2. Get the uploaded image.
    const formData = await request.formData();
    const file = formData.get("photo");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        {message: "Please select a profile photo."},
        {status: 400},
      );
    }

    // 3. Validate the image type.
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {message: "Only JPEG, PNG and WebP images are allowed."},
        {status: 400},
      );
    }

    // 4. Validate file size.
    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {message: "Your image must be between 1 byte and 5 MB."},
        {status: 400},
      );
    }

    // 5. Get the Google Drive folder ID.
    const folderResult = await pool.query(
      `SELECT drive_folder_id
       FROM google_drive_folders
       WHERE folder_key = $1`,
      ["profile_photos"],
    );

    if (folderResult.rows.length === 0) {
      return NextResponse.json(
        {message: "Profile photo storage folder has not been configured."},
        {status: 500},
      );
    }

    const folderId = folderResult.rows[0].drive_folder_id;

    // 6. Connect to Google Drive.
    drive = await getGoogleDriveClient();

    // 7. Convert the uploaded image into a format Google Drive accepts.
    const buffer = Buffer.from(await file.arrayBuffer());

    // 8. Upload the image to Google Drive.
    const uploadResult = await drive.files.create({
      requestBody: {
        name: `profile-${user.userId}-${Date.now()}`,
        mimeType: file.type,
        parents: [folderId],
      },
      media: {
        mimeType: file.type,
        body: Readable.from(buffer),
      },
      fields: "id",
    });

    uploadedFileId = uploadResult.data.id;

    if (!uploadedFileId) {
      throw new Error("Google Drive did not return a file ID.");
    }

    // 9. Save the Google Drive file ID in the member's profile.
    await pool.query(
      `UPDATE users
       SET photo = $1
       WHERE id = $2`,
      [uploadedFileId, user.userId],
    );

    return NextResponse.json({
      success: true,
      message: "Profile photo uploaded successfully.",
      photo: uploadedFileId,
    });
  } catch (error) {
    console.error("Profile photo upload error:", error);

    // Remove the uploaded file if saving its ID in PostgreSQL failed.
    if (uploadedFileId && drive) {
      try {
        await drive.files.delete({
          fileId: uploadedFileId,
        });
      } catch (cleanupError) {
        console.error("Google Drive cleanup error:", cleanupError);
      }
    }

    return NextResponse.json(
      {message: "Unable to upload your profile photo."},
      {status: 500},
    );
  }
}

export async function GET() {
  try {
    // 1. Confirm that the member is logged in.
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {message: "Please log in first."},
        {status: 401},
      );
    }

    // 2. Get the member's photo ID from PostgreSQL.
    const result = await pool.query(`SELECT photo FROM users WHERE id = $1`, [
      user.userId,
    ]);

    if (result.rows.length === 0 || !result.rows[0].photo) {
      return NextResponse.json(
        {message: "No profile photo found."},
        {status: 404},
      );
    }

    const photoId = result.rows[0].photo;

    // Ignore old placeholder URLs.
    if (/^https?:\/\//i.test(photoId)) {
      return NextResponse.json(
        {message: "Please upload a new profile photo."},
        {status: 404},
      );
    }

    // 3. Connect to Google Drive.
    const drive = await getGoogleDriveClient();

    // 4. Get the image's information.
    const metadata = await drive.files.get({
      fileId: photoId,
      fields: "id, mimeType",
    });

    if (!ALLOWED_TYPES.includes(metadata.data.mimeType)) {
      return NextResponse.json(
        {message: "Invalid profile photo."},
        {status: 415},
      );
    }

    // 5. Download the image from Google Drive.
    const imageResponse = await drive.files.get(
      {
        fileId: photoId,
        alt: "media",
      },
      {
        responseType: "stream",
      },
    );

    // 6. Convert the Node.js stream into a web stream.
    const imageStream = Readable.toWeb(imageResponse.data);

    // 7. Return the image to the browser.
    return new NextResponse(imageStream, {
      headers: {
        "Content-Type": metadata.data.mimeType,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    console.error("Profile photo retrieval error:", error);

    return NextResponse.json(
      {message: "Unable to retrieve profile photo."},
      {status: 500},
    );
  }
}
