import pool from "@/lib/db";

export async function getDeductionTotals(memberId) {
  const result = await pool.query(
    `SELECT 
        -- Thrift: all thrift deductions minus thrift withdrawals
        COALESCE (
            (
            SELECT SUM(d.thrift)
            FROM deductions d
            WHERE d.member_id = $1
            ), 0
        ) - COALESCE (
            (
            SELECT SUM(t.amount) 
            FROM transactions t
            WHERE t.member_id = $1
            AND t.payment_type = 'Thrift withdrawal'
            ), 0
        ) AS thrift,

        -- Special savings: deductions for the current year
        COALESCE(
            (
            SELECT SUM(d.special_savings)
            FROM deductions d
            WHERE d.member_id = $1
            AND EXTRACT(YEAR FROM d.period) =
                EXTRACT(YEAR FROM CURRENT_DATE)
            ), 0
        ) AS special_savings,

        -- Commodity: deductions for commodity
        COALESCE(
            (
            SELECT SUM(d.commodity)
            FROM deductions d
            WHERE d.member_id = $1
            AND EXTRACT(YEAR FROM d.period) = 
                EXTRACT(YEAR FROM CURRENT_DATE)
            ), 0
        ) AS commodity,

        -- Rent: deductions for rent
        COALESCE(
            (
            SELECT SUM(d.rent)
            FROM deductions d
            WHERE d.member_id = $1
            AND EXTRACT(YEAR FROM d.period) = 
                EXTRACT(YEAR FROM CURRENT_DATE)
            ), 0
        ) AS rent,

        -- Land Repayment: deductions for land
        COALESCE (
            (
            SELECT SUM(d.land)
            FROM deductions d
            WHERE d.member_id = $1
            )
        ) AS land
    `,
    [memberId],
  );

  return result.rows[0];
}

export default async function getTotalDeductions(cooperativeCode) {
  const result = await pool.query(
    `SELECT
        COALESCE(
          SUM(
            COALESCE(d.thrift, 0) +
            COALESCE(d.special_savings, 0) +
            COALESCE(d.commodity, 0) +
            COALESCE(d.loan_repayment, 0) +
            COALESCE(d.rent, 0) +
            COALESCE(d.land, 0)
          ), 0
        ) AS allocation,

        TO_CHAR(
          DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month',
          'FMMonth'
        ) AS allocation_month

     FROM deductions d
     JOIN members m ON m.id = d.member_id

     WHERE
    m.cooperative_code = $1
    AND d.period >= (
        SELECT MAX(DATE_TRUNC('month', d2.period))
        FROM deductions d2
        JOIN members m2 ON m2.id = d2.member_id
        WHERE m2.cooperative_code = $1
    )
    AND d.period < (
        SELECT MAX(DATE_TRUNC('month', d2.period)) + INTERVAL '1 month'
        FROM deductions d2
        JOIN members m2 ON m2.id = d2.member_id
        WHERE m2.cooperative_code = $1
    )

    
    `,
    [cooperativeCode],
  );

  return result.rows[0];
}

//  WHERE
//     m.cooperative_code = $1
//     AND d.period >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
//     AND d.period < DATE_TRUNC('month', CURRENT_DATE)
