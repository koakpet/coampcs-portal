import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {success: false, message: "Unauthorized"},
        {status: 401},
      );
    }

    const {membershipId} = await request.json();

    if (!membershipId) {
      return NextResponse.json(
        {success: false, message: "Membership ID is required"},
        {status: 400},
      );
    }

    const result = await pool.query(
      `
      SELECT id
      FROM members
      WHERE id = $1
      AND user_id = $2
      AND status = 'ACTIVE'
      `,
      [membershipId, user.userId],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have access to this cooperative",
        },
        {status: 403},
      );
    }

    const cookieStore = await cookies();

    cookieStore.set("selected_cooperative", String(membershipId), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Select cooperative error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {status: 500},
    );
  }
}
