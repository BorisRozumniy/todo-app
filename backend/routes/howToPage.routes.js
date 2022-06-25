import { Router } from "express";
import { blogArticles } from "../mockData/index.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("req");
    res.json(blogArticles);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

export default router;
