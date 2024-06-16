import { Router, Request, Response } from "express";
import pool from "./db";

const router = Router();

interface Todo {
  id: number;
  name: string;
}

// This route handles requests to the root path '/'
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the To-Do List App!");
});

// This route gets all tasks
router.get("/eaters", async (req: Request, res: Response) => {
  try {
    console.log(pool)
    const result = await pool.query("SELECT * FROM eater");
    const todos: Todo[] = result.rows;
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos", error);
    res.status(500).json({ error: "Error fetching todos" });
  }
});

export default router;