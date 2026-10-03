import redis from '@/lib/redis';

export async function GET (){
    await redis.set("message", "Hello from TeamForge");

    const value = await redis.get("message");


    return Response.json({value});
}


