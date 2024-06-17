import { Request, Response } from "express";

import pool from "../db";
import {
  GET_EATERS_BY_NAME,
  RESTRICTIONS_BY_EATER_IDS,
  RESERVATIONS_BY_TIME_AND_EATER_IDS,
  RESTAURANTS_BY_RESTRICTION_IDS_AND_TABLE_CAPACITY
} from "../queries";
import { Eater, Restriction, Reservation, Restaurant } from "../interfaces";

export async function availableRestaraunts(req: Request, res: Response) {
  try {
    const names = String(req.query.names).split(',')
    const dateTime = new Date(String(req.query.datetime)).toISOString();

    const eatersResult = await pool.query(GET_EATERS_BY_NAME, [names]);
    const eaters: Eater[] = eatersResult.rows;

    const eaterIds = eaters.map(eater => eater.id)

    // Check if any eaters have reservations that conflict with the requested datetime
    const reservationResult = await pool.query(
      RESERVATIONS_BY_TIME_AND_EATER_IDS,
      [dateTime, eaterIds]
    );
    const reservations: Reservation[] = reservationResult.rows

    // If they do, return the reservations with an error
    if (reservations.length > 0) {
      res.json({
        'error': 'Requested eaters have conflicting reservations',
        reservations
      });
    }

    // Look up dietary restrictions for eaters
    const restrictionResult = await pool.query(
      RESTRICTIONS_BY_EATER_IDS,
      [eaterIds]
    )
    const restrictions: Restriction[] = restrictionResult.rows;
    const restrictionIds = restrictions.map(restriction => restriction.id)

    // Look up restaurants that match the dietary restrictions
    // and have table capacity for the amount of eaters
    const restaurantResult = await pool.query(
      RESTAURANTS_BY_RESTRICTION_IDS_AND_TABLE_CAPACITY,
      [restrictionIds, eaterIds.length]
    )
    const restaurants: Restaurant[] = restaurantResult.rows;

    // Return error if no restaurants found
    if (restaurants.length < 1) {
      res.json({
        'error': 'No restaurants matched the dietary restrictions or capacity'
      })
    }

    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching eaters", error);
    res.status(500).json({ error: "Error fetching restaurants" });
  }
}