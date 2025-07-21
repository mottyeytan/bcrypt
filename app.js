import express from "express";
import dotenv from "dotenv";
import users from "./routes/users.js";
import cookieParser from "cookie-parser";
import posts from "./routes/posts.js";

dotenv.config();

const server = express();

server.use(cookieParser())

server.use(express.json());

server.use("/api/auth", users);
server.use("/api/posts", posts);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default server;