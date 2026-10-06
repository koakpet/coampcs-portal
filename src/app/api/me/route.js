import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "You are not authenticated",
        },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}