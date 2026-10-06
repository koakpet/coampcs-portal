import pool from "@/lib/db";
import {comparePassword} from "@/lib/auth/password";
import {createSession} from "@/lib/auth/session";

export async function POST(request) {
  try {
    const body = await request.json();

    const {identifier, password} = body;

    if (!identifier || !password) {
      return Response.json(
        {
          success: false,
          message: "Email/phone number and password are required",
        },
        {
          status: 400,
        },
      );
    }

    const isEmail = identifier.includes("@");

    let result;

    if (isEmail) {
      result = await pool.query(
        `SELECT 
          id,
          first_name,
          middle_name,
          last_name
          email,
          password
        FROM users 
        WHERE LOWER(email) = LOWER($1)`,
        [identifier.trim()],
      );
    } else {
      const phone = identifier.trim().slice(-10);

      result = await pool.query(
        `SELECT 
          id,
          first_name,
          middle_name,
          last_name,
          email,
          password
        FROM users 
        WHERE RIGHT(phone, 10) = $1`,
        [pphone],
      );
    }

    if (result.rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        {status: 401},
      );
    }

    const user = result.rows[0];

    const passwordIsCorrect = await comparePassword(password, user.password);

    if (!passwordIsCorrect) {
      return Response.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        {status: 401},
      );
    }

    await pool.query(
      `
      UPDATE users
      SET last_login = CURRENT_TIMESTAMP
      WHERE id = $1
      `,
      [user.id],
    );

    const sessionToken = await createSession(user.id);

    return Response.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          first_name: user.first_name,
          middle_name: user.middle_name,
          last_name: user.last_name,
          email: user.email,
        },
      },
      {
        headers: {
          "Set-Cookie": `session=${sessionToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`,
        },
      },
    );
  } catch (error) {
    console.error("Login error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong during login",
      },
      {status: 500},
    );
  }
}
