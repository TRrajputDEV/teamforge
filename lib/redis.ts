import { createClient } from "redis";

const redis = createClient({
  url: "redis://localhost:6379",
});

redis.on("error", (err)=>{
    console.error("redis Client Error: ", err);
})

redis.connect();


export default redis;