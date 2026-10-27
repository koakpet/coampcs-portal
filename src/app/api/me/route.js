import pool from "@/lib/db";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";

export async function GET() {
  try {
    // 1. Identify the logged-in user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return Response.json(
        {
          success: false,
          message: "You are not authenticated",
        },
        {status: 401},
      );
    }

    // 2. Retrieve the user's complete profile
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
      [currentUser.userId],
    );

    if (result.rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {status: 404},
      );
    }

    // 3. Return the profile
    return Response.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch user profile",
      },
      {status: 500},
    );
  }
}

export async function PATCH(request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return Response.json(
        {
          success: false,
          message: "You are not authenticated",
        },
        {status: 401},
      );
    }

    const body = await request.json();

    // Only these fields can be directly updated by members.
    const allowedFields = {
      phone: body.phone,
      address: body.address,
      city: body.city,
      state_addr: body.state_addr,
    };

    const updates = Object.entries(allowedFields).filter(([key, value]) =>
      Object.hasOwn(body, key),
    );

    if (updates.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No valid fields provided for update",
        },
        {status: 400},
      );
    }

    // Validate submitted values.
    for (const [field, value] of updates) {
      if (value !== null && (typeof value !== "string" || value.length > 255)) {
        return Response.json(
          {
            success: false,
            message: `Invalid value for ${field}`,
          },
          {status: 400},
        );
      }
    }

    // Build the SQL update dynamically using only allowed columns.
    const values = updates.map(([field, value]) =>
      typeof value === "string" ? value.trim() || null : value,
    );

    const setClause = updates
      .map(([field], index) => `${field} = $${index + 1}`)
      .join(", ");

    values.push(currentUser.userId);

    const result = await pool.query(
      `
      UPDATE users
      SET ${setClause}
      WHERE id = $${values.length}
      RETURNING
        id,
        phone,
        address,
        city,
        state_addr
      `,
      values,
    );

    if (result.rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {status: 404},
      );
    }

    return Response.json({
      success: true,
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to update profile",
      },
      {status: 500},
    );
  }
}
