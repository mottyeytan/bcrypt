import express from "express";

const router = express.Router();

router.get("/posts", async (req, res) => {
const token = req.cookies.token;
if (token) {
  res.json({ message: "posts" });
} else {
  res.status(404).json({ message: "Token not found" });
}
});

export default router;