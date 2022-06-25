import { Router } from "express";
import { create, read, update, remove } from "../controllers/todos.js";
const router = Router();

router.post("/todo/", create);
router.get("/todo/", read);
router.patch("/todo/:id", update);
router.delete("/todo/:id", remove);

export default router;
