import crypto from "crypto";
import pool from "@/lib/db";

export async function createSession(userId) {
  const sessionToken = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto
    .createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + 7);

  await pool.query(
    `
    INSERT INTO sessions (
      user_id,
      token_hash,
      expires_at
    )
    VALUES ($1, $2, $3)
    `,
    [userId, tokenHash, expiresAt]
  );

  return sessionToken;
}

export async function validateSession(sessionToken) {
  const tokenHash = crypto
    .createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const result = await pool.query(
    `
    SELECT
      sessions.id,
      sessions.user_id,
      sessions.expires_at,
      users.first_name,
      users.middle_name,
      users.last_name,
      users.email
    FROM sessions
    INNER JOIN users
      ON sessions.user_id = users.id
    WHERE sessions.token_hash = $1
    `,
    [tokenHash]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const session = result.rows[0];

  if (new Date(session.expires_at) < new Date()) {
    await pool.query(
      `
      DELETE FROM sessions
      WHERE id = $1
      `,
      [session.id]
    );

    return null;
  }

  return {
    sessionId: session.id,
    userId: session.user_id,
    firstName: session.first_name,
    middleName: session.middle_name,
    lastName: session.last_name,
    email: session.email,
    expiresAt: session.expires_at,
  };
}

export async function deleteSession(sessionToken) {
  const tokenHash = crypto
    .createHash("SHA256")
    .update(sessionToken)
    .digest("hex")

  await pool.query(
    `
    DELETE FROM sessions
    WHERE token_hash = $1
    `,
    [tokenHash]
  );
}