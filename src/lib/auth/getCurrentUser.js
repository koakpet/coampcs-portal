import { cookies } from "next/headers";
import { validateSession } from "@/lib/auth/session";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return null;
  }

  const session = await validateSession(sessionToken);

  if (!session) {
    return null;
  }

  return session;
}