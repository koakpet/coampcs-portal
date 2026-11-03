import {google} from "googleapis";
import {NextResponse} from "next/server";
import crypto from "crypto";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";

export async function GET() {
  // Check whether someone is logged in
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({message: "Please log in first."}, {status: 401});
  }

  // Only the designated storage administrator can connect Google Drive
  if (String(user.userId) !== String(process.env.GOOGLE_DRIVE_ADMIN_USER_ID)) {
    return NextResponse.json(
      {message: "You are not authorized to manage Google Drive."},
      {status: 403},
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  const state = crypto.randomBytes(32).toString("hex");

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    state,
    scope: ["openid", "email", "https://www.googleapis.com/auth/drive.file"],
  });

  const response = NextResponse.redirect(authUrl);

  response.cookies.set("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/google/callback",
    maxAge: 600,
  });

  return response;
}
