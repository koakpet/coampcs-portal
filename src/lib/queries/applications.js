import pool from "../db";

export default async function totalLoanApplications(cooperativeCode) {
  const result = pool.query(
    `
    SELECT
    FROM applications a
    WHERE cooperative_code = $1
    `,
    [cooperativeCode],
  );

  return result.rows[0];
}
