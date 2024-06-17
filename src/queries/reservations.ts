export const RESERVATIONS_BY_TIME_AND_EATER_IDS = `
  SELECT reservations.datetime, eaters.name as "eater_name", restaurants.name as "restaurant_name"
  FROM reservations
  JOIN restaurants ON restaurants.id = reservations.restaurant_id
  JOIN eaters_reservations ON reservations.id = eaters_reservations.reservation_id
  JOIN eaters ON eaters.id = eaters_reservations.eater_id
  WHERE EXTRACT(DAY from $1::TIMESTAMP) = EXTRACT(DAY from reservations.datetime)
  AND $1 BETWEEN reservations.datetime AND (reservations.datetime + '2 hours'::INTERVAL)
  AND eaters.id = ANY($2)
`;

export const CREATE_RESERVATION = `
  INSERT INTO reservations(restaurant_id, datetime)
  VALUES($1, $2)
  RETURNING *
`

export const CREATE_EATER_RESERVATION = `
  INSERT INTO eaters_reservations(eater_id, reservation_id)
  VALUES($1, $2)
  RETURNING *
`