import pool from "../db";

export async function getMembershipByUserId(userId) {
  const result = await pool.query(
    `
        SELECT
            id,
            cooperative_code,
            cooperative_name,
            membership_number,
            role,
            status,
            joined_date
        FROM members
        WHERE user_id = $1
        ORDER BY cooperative_name ASC
        `,
    [userId],
  );

  return result.rows;
}

export async function getMembershipByIdForUser(membershipId, userId) {
  const result = await pool.query(
    `
    SELECT
      id,
      cooperative_code,
      cooperative_name,
      membership_number,
      role,
      status,
      joined_date
    FROM members
    WHERE id = $1
      AND user_id = $2
      AND status = 'ACTIVE'
    `,
    [membershipId, userId],
  );

  return result.rows[0] || null;
}
