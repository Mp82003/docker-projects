const express = require("express");
const { createClient } = require("redis");

const app = express();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
  },
});

redisClient.on("error", (err) => console.log("Redis Error:", err));

(async () => {
  await redisClient.connect();
  console.log("Connected to Redis");
})();

app.get("/", async (req, res) => {
  const cachedData = await redisClient.get("message");

  if (cachedData) {
    return res.send(`Cache Hit: ${cachedData}`);
  }

  const data = "Hello from Database";

  await redisClient.set("message", data, {
    EX: 30,
  });

  res.send(`Cache Miss: ${data}`);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
