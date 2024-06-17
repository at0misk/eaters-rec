import {Request, Response} from "express";

import pool from "../db";
import { ALL_EATERS_QUERY, GET_EATERS_BY_NAME } from "../queries";
import { Eater } from "../interfaces";

export async function eatersIndex(req: Request, res: Response) {
  try {
    const result = await pool.query(ALL_EATERS_QUERY);
    const eaters: Eater[] = result.rows;

    res.json(eaters);
  } catch (error) {
    console.error("Error fetching eaters", error);
    res.status(500).json({ error: "Error fetching eaters" });
  }
}

export async function eatersByName(req: Request, res: Response) {
  try {
    const names = String(req.query.names).split(',')

    const result = await pool.query(GET_EATERS_BY_NAME, [names]);
    const eaters: Eater[] = result.rows;

    res.json(eaters);
  } catch (error) {
    console.error("Error fetching eaters", error);
    res.status(500).json({ error: "Error fetching eaters" });
  }
}