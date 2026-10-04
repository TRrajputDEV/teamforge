import bcrypt from "bcrypt";
import pool from "@/lib/db";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  const result = await pool.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  if (result.rows.length > 0) {
    return Response.json({ message: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, hashedPassword],
  );

  return Response.json({ message: "User created" });
}
