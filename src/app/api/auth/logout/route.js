import {cookies} from "next/headers";
import {deleteSession} from "@/lib/auth/session";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const sessionToken = cookieStore.get("session")?.value;

    if (sessionToken) {
      await deleteSession(sessionToken);
    }

    // Delete the login session
    cookieStore.delete("session");

    // Delete the cooperative selected during this login session
    cookieStore.delete("selected_cooperative");

    return Response.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong during logout",
      },
      {status: 500},
    );
  }
}
