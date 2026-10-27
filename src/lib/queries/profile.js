import pool from "../db";

export async function getProfileByUserId(userId) {
  const result = await pool.query(
    `
    SELECT
      u.id,
      u.first_name,
      u.middle_name,
      u.last_name,
      u.email,
      u.phone,
      u.gender,
      u.date_of_birth,
      u.employment_date,
      u.retirement_date,
      u.bank_payment,
      u.account_no,
      u.photo,
      u.division,
      
      COALESCE(
        (
          SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', m.id,
              'cooperative_code', m.cooperative_code,
              'cooperative_name', m.cooperative_name,
              'membership_no', m.membership_no,
              'role', m.role,
              'status', m.status,
              'joined_date', m.joined_date
            )
            ORDER BY m.cooperative_name
          )
          FROM members m
          WHERE m.user_id = u.id
        ),
        '[]'::json
      ) AS memberships

    FROM users u
    WHERE u.id = $1
    `,
    [userId],
  );

  return result.rows[0] || null;
}
