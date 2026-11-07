import pool from "@/lib/db";

export async function getTransactionsMade(memberId) {
  const result = await pool.query(
    `
    WITH loan_summary AS (
      SELECT
        -- Outstanding: latest loan minus repayments since its issue month
        COALESCE(
          (
            SELECT t.amount
            FROM transactions t
            WHERE t.member_id = $1
              AND t.payment_type = 'Loan'
            ORDER BY t.payment_date DESC, t.id DESC
            LIMIT 1
          ),
          0
        )
        -
        COALESCE(
          (
            SELECT SUM(d.loan_repayment)
            FROM deductions d
            WHERE d.member_id = $1
              AND d.period >= DATE_TRUNC(
                'month',
                (
                  SELECT t.payment_date
                  FROM transactions t
                  WHERE t.member_id = $1
                    AND t.payment_type = 'Loan'
                  ORDER BY t.payment_date DESC, t.id DESC
                  LIMIT 1
                )
              )::date
          ),
          0
        ) AS outstanding,

        -- Total loan: latest original loan plus subsequent top-ups
        COALESCE(
          (
            SELECT t.amount
            FROM transactions t
            WHERE t.member_id = $1
              AND t.payment_type = 'Loan'
            ORDER BY t.payment_date DESC, t.id DESC
            LIMIT 1
          ),
          0
        )
        +
        COALESCE(
          (
            SELECT SUM(t.amount)
            FROM transactions t
            WHERE t.member_id = $1
              AND t.payment_type = 'Loan top-up'
              AND t.payment_date >= (
                SELECT t2.payment_date
                FROM transactions t2
                WHERE t2.member_id = $1
                  AND t2.payment_type = 'Loan'
                ORDER BY t2.payment_date DESC, t2.id DESC
                LIMIT 1
              )
          ),
          0
        ) AS total_loan
    )

    SELECT
      outstanding,
      total_loan,

      -- Progress: percentage of the loan repaid
      CASE
        WHEN total_loan > 0 THEN
          ROUND(
            (
              (total_loan - outstanding) / total_loan
            ) * 100,
            2
          )
        ELSE 0
      END AS progress

    FROM loan_summary
    `,
    [memberId],
  );

  return result.rows[0];
}

export default async function getTotalDisbursementMade(cooperativeCode) {
  const result = await pool.query(
    `SELECT
        COALESCE(SUM(COALESCE(t.debit, 0)), 0) AS loan_disbursed,

        TO_CHAR(
          MAX(DATE_TRUNC('month', t.payment_date)),
          'FMMonth'
        ) AS month

     FROM transactions t

     WHERE t.cooperative_code = $1
       AND t.payment_type = 'Loan'

       AND DATE_TRUNC('month', t.payment_date) = (
          SELECT MAX(DATE_TRUNC('month', t2.payment_date))
          FROM transactions t2
          WHERE t2.cooperative_code = $1
            AND t2.payment_type = 'Loan'
       )
    `,
    [cooperativeCode],
  );

  return result.rows[0];
}
