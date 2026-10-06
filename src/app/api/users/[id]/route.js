import pool from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const result = await pool.query(
      `
      SELECT
        id,
        first_name,
        middle_name,
        last_name,
        email,
        phone,
        bank,
        account_no,
        employment_date,
        gender,
        date_of_birth,
        photo,
        address,
        city,
        state_addr,
        last_login
      FROM users
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching user:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}