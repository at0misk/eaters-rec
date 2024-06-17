import { Request, Response } from "express";

import pool from "../db";
import {
  CREATE_EATER_RESERVATION,
  CREATE_RESERVATION,
  FIND_RESTAURANT_BY_NAME,
  GET_EATERS_BY_NAME
} from "../queries";
import { Eater, Restaurant, Reservation } from "../interfaces";

export async function createReservation(req: Request, res: Response) {
  try {
    const names = String(req.query.names).split(',');
    const eatersResult = await pool.query(GET_EATERS_BY_NAME, [names]);
    const eaters: Eater[] = eatersResult.rows;
    const eaterIds = eaters.map(eater => eater.id)

    const dateTime = new Date(String(req.query.datetime)).toISOString();

    const restaurantName = String(req.query.restaurant);
    const restaurantResult = await pool.query(FIND_RESTAURANT_BY_NAME, [restaurantName]);
    const restaurant: Restaurant = restaurantResult.rows[0];

    let errors = [];
    let records = [];

    if (!restaurant) {
      errors.push(`No restaurant found for name ${restaurantName}`);
    }

    // Create reservation
    const reservationResult = await pool.query(
      CREATE_RESERVATION,
      [Number(restaurant.id), dateTime]
    );
    const reservation: Reservation = reservationResult.rows[0]

    if (!reservation) {
      errors.push(`Reservation records could not be created`);
    }

    // Create eaters reservations
    for (const eaterId of eaterIds) {
      const eatersReservationsResult = await pool.query(
        CREATE_EATER_RESERVATION,
        [eaterId, reservation.id]
      )

      if (eatersReservationsResult.rows.length === 0) {
        errors.push(`Eaters reservations records could not be created`);
      }
    }

    if (errors.length === 0) {
      records.push(reservation)
    }

    res.json({ records, errors });
  } catch (error) {
    console.error("Error fetching eaters", error);
    res.status(500).json({ error: "Error creating reservation" });
  }
}