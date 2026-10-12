import pool from "@/lib/db";

export async function getMandate(memberId) {
  const result = await pool.query(
    `
    SELECT
      COALESCE(m.thrift, 0) AS thrift,
      COALESCE(m.special_savings, 0) AS special_savings,
      COALESCE(m.commodity, 0) AS commodity,
      COALESCE(m.rent, 0) AS rent,
      COALESCE(m.land, 0) AS land
    FROM mandate m
    WHERE m.member_id = $1
    `,
    [memberId],
  );

  return result.rows[0];
}
