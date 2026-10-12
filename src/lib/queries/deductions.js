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
            SELECT SUM(p.amount) 
            FROM payments p
            WHERE p.member_id = $1
            AND p.payment_type = 'Thrift withdrawal'
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
