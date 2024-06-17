import { Request, Response } from "express";

import pool from "../db";
import { GET_EATERS_BY_NAME, RESTRICTIONS_BY_EATER_IDS } from "../queries";
import { Eater, Restriction } from "../interfaces";

export async function restrictionsByEaterNames(req: Request, res: Response) {
  try {
    const names = String(req.query.names).split(',')
    const eatersResult = await pool.query(GET_EATERS_BY_NAME, [names]);
    const eaters: Eater[] = eatersResult.rows;

    const eaterIds = eaters.map(eater => eater.id)
    console.log(eaterIds)

    const restrictionResult = await pool.query(
      RESTRICTIONS_BY_EATER_IDS,
      [eaterIds]
    )
    const restrictions: Restriction[] = restrictionResult.rows;

    res.json(restrictions);
  } catch (error) {
    console.error("Error fetching eaters", error);
    res.status(500).json({ error: "Error fetching restrictions" });
  }
}