import {NextResponse} from "next/server";
import pool from "@/lib/db";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import {getGoogleDriveClient} from "@/lib/googleDrive";

export const runtime = "nodejs";

const folders = [
  {
    key: "root",
    name: "CoA-MPCS Portal Storage",
    parent: null,
  },
  {
    key: "profile_photos",
    name: "Profile Photos",
    parent: "root",
  },
  //   {
  //     key: "payment_receipts",
  //     name: "PAYMENT RECEIPTS",
  //     parent: "root",
  //   },
  //   {
  //     key: "loan_documents",
  //     name: "LOAN DOCUMENTS",
  //     parent: "root",
  //   },
  //   {
  //     key: "withdrawal_documents",
  //     name: "WITHDRAWAL DOCUMENTS",
  //     parent: "root",
  //   },
];

export async function POST() {
  try {
    // 1. Verify logged-in user
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {message: "Please log in first."},
        {status: 401},
      );
    }

    // 2. Verify storage administrator
    if (
      String(user.userId) !== String(process.env.GOOGLE_DRIVE_ADMIN_USER_ID)
    ) {
      return NextResponse.json(
        {message: "Not authorized to manage Google Drive."},
        {status: 403},
      );
    }

    // 3. Get authenticated Google Drive client
    const drive = await getGoogleDriveClient();

    // 4. Load existing folder records
    const existing = await pool.query(
      `SELECT folder_key, drive_folder_id
       FROM google_drive_folders`,
    );

    const folderIds = {};

    for (const row of existing.rows) {
      folderIds[row.folder_key] = row.drive_folder_id;
    }

    // 5. Create missing folders and save their IDs
    for (const folder of folders) {
      if (folderIds[folder.key]) {
        continue;
      }

      const metadata = {
        name: folder.name,
        mimeType: "application/vnd.google-apps.folder",
      };

      if (folder.parent) {
        const parentId = folderIds[folder.parent];

        if (!parentId) {
          throw new Error(`Parent folder missing for ${folder.name}`);
        }

        metadata.parents = [parentId];
      }

      const response = await drive.files.create({
        requestBody: metadata,
        fields: "id, name",
      });

      const folderId = response.data.id;

      if (!folderId) {
        throw new Error(`Google did not return an ID for ${folder.name}`);
      }

      await pool.query(
        `INSERT INTO google_drive_folders
          (folder_key, folder_name, drive_folder_id)
         VALUES ($1, $2, $3)
         ON CONFLICT (folder_key)
         DO UPDATE SET
           folder_name = EXCLUDED.folder_name,
           drive_folder_id = EXCLUDED.drive_folder_id`,
        [folder.key, folder.name, folderId],
      );

      folderIds[folder.key] = folderId;
    }

    return NextResponse.json({
      success: true,
      message: "Google Drive folders are ready.",
      folders: Object.keys(folderIds),
    });
  } catch (error) {
    console.error("Google Drive folder setup error:", error);

    return NextResponse.json(
      {message: "Unable to set up Google Drive folders."},
      {status: 500},
    );
  }
}
