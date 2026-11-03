import "server-only";
import {google} from "googleapis";
import crypto from "crypto";
import pool from "@/lib/db";

function decryptToken(encryptedToken) {
  const parts = encryptedToken.split(":");

  if (parts.length !== 4 || parts[0] !== "v1") {
    throw new Error("Invalid encrypted Google token format.");
  }

  const [, ivHex, authTagHex, encryptedHex] = parts;

  const keyHex = process.env.GOOGLE_TOKEN_ENCRYPTION_KEY;

  if (!/^[0-9a-fA-F]{64}$/.test(keyHex || "")) {
    throw new Error("Invalid Google encryption key.");
  }

  const key = Buffer.from(keyHex, "hex");
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}

export async function getGoogleDriveClient() {
  // Retrieve the saved Google Drive connection
  const result = await pool.query(
    `SELECT refresh_token_encrypted
     FROM google_drive_connections
     ORDER BY created_at DESC
     LIMIT 1`,
  );

  if (result.rows.length === 0) {
    throw new Error("Google Drive has not been connected.");
  }

  // Decrypt the refresh token
  const refreshToken = decryptToken(result.rows[0].refresh_token_encrypted);

  // Create authenticated Google client
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  // Return Google Drive API client
  return google.drive({
    version: "v3",
    auth: oauth2Client,
  });
}
