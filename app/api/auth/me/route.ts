import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token){
        return Response.json(
            {message: "Not Authenticated"},
            {status: 401}
        );
    }
    try{
        const payload = await verifyToken(token);

        return Response.json({
            message: "Authenticated",
            userId: payload.userId,
        });
    } catch{
        return Response.json(
            {message: "Invalid or expired token"},
            {status: 401}
        );
    }
}