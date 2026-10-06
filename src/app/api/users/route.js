import { getAllUsers } from "@/lib/queries/users";

export async function GET() {
  try {
    const users = await getAllUsers();

    return Response.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      },
      { status: 500 }
    );
  }
}