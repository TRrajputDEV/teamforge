import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret= new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(userId:number) {
    return new SignJWT({ userId })
    .setProtectedHeader({ alg : "HS256"})
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token:string) {
    const {payload} = await jwtVerify(token, secret);

    return payload;
}

export async function getAuthenticatedUser(){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token){
        return null;
    }

    try{
        return await verifyToken(token);
    }catch{
        return null;
    }
}