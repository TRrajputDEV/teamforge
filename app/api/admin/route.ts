import { getAuthenticatedUser } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return Response.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  const result = await pool.query(
    "SELECT role FROM users WHERE id = $1",
    [user.userId]
  );

  const dbUser = result.rows[0];

  if (!dbUser || dbUser.role !== "ADMIN") {
    return Response.json(
      { message: "Forbidden" },
      { status: 403 }
    );
  }

  return Response.json({
    message: "Welcome, Admin",
  });
}