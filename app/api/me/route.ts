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
    "SELECT id, name, email, role FROM users WHERE id = $1",
    [user.userId]
  );

  return Response.json({
    user: result.rows[0],
  });
}