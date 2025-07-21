import express from "express";
import { pool } from "../mysqlClient.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const response = await pool.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
  res.send(response);
});

router.post("/verify", async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await pool.execute("SELECT * FROM users WHERE username = ?", [username]);
    const user = response[0];
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (isPasswordValid) {
      res.status(200).json({ user: user.username, message: "verified" });
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

export default router;