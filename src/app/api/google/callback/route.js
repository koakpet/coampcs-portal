import {google} from "googleapis";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import crypto from "crypto";
import pool from "@/lib/db";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";

// Redirect user back to dashboard and clear OAuth state cookie
function redirectWithStatus(request, status) {
  const response = NextResponse.redirect(
    new URL(`/dashboard?googleDrive=${status}`, request.url),
  );

  response.cookies.set("google_oauth_state", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/google/callback",
    maxAge: 0,
  });

  return response;
}

// Encrypt refresh token using AES-256-GCM
function encryptToken(token) {
  const keyHex = process.env.GOOGLE_TOKEN_ENCRYPTION_KEY;

  if (!/^[0-9a-fA-F]{64}$/.test(keyHex || "")) {
    throw new Error("Invalid encryption key.");
  }

  const key = Buffer.from(keyHex, "hex");
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    "v1",
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted.toString("hex"),
  ].join(":");
}

export async function GET(request) {
  try {
    const url = new URL(request.url);

    const code = url.searchParams.get("code");
    const returnedState = url.searchParams.get("state");
    const googleError = url.searchParams.get("error");

    // Check Google's response
    if (googleError || !code || !returnedState) {
      return redirectWithStatus(request, "authorization_failed");
    }

    // Check logged-in user
    const user = await getCurrentUser();

    if (!user) {
      return redirectWithStatus(request, "unauthorized");
    }

    // Check designated storage administrator
    if (
      String(user.userId) !== String(process.env.GOOGLE_DRIVE_ADMIN_USER_ID)
    ) {
      return redirectWithStatus(request, "forbidden");
    }

    // Validate OAuth state
    const cookieStore = await cookies();

    const savedState = cookieStore.get("google_oauth_state")?.value;

    if (
      !savedState ||
      savedState.length !== returnedState.length ||
      !crypto.timingSafeEqual(
        Buffer.from(savedState),
        Buffer.from(returnedState),
      )
    ) {
      return redirectWithStatus(request, "invalid_state");
    }

    // Create Google OAuth client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    // Exchange authorization code for tokens
    const {tokens} = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      return redirectWithStatus(request, "missing_refresh_token");
    }

    oauth2Client.setCredentials(tokens);

    // Retrieve connected Google account
    const oauth2 = google.oauth2({
      version: "v2",
      auth: oauth2Client,
    });

    const {data: googleUser} = await oauth2.userinfo.get();

    if (!googleUser.email) {
      throw new Error("Google account email unavailable.");
    }

    // Encrypt refresh token
    const encryptedToken = encryptToken(tokens.refresh_token);

    // Save connection in PostgreSQL
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Replace existing connection
      await client.query("DELETE FROM google_drive_connections");

      await client.query(
        `INSERT INTO google_drive_connections
          (connected_by, refresh_token_encrypted, google_email)
         VALUES ($1, $2, $3)`,
        [user.userId, encryptedToken, googleUser.email],
      );

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }

    return redirectWithStatus(request, "connected");
  } catch (error) {
    console.error("Google Drive callback error:", error);

    return redirectWithStatus(request, "connection_failed");
  }
}
