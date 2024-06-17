export const RESTAURANTS_BY_RESTRICTION_IDS_AND_TABLE_CAPACITY = `
  SELECT restaurants.name, restrictions.label as restriction_label
  FROM restaurants
  JOIN restaurants_restrictions ON restaurants.id = restaurants_restrictions.restaurant_id
  JOIN restrictions ON restrictions.id = restaurants_restrictions.restriction_id
  JOIN tables ON tables.restaurant_id = restaurants.id
  WHERE restrictions.id = ANY($1)
  AND tables.capacity >= $2
  GROUP BY restaurants.name, restrictions.label
`

export const FIND_RESTAURANT_BY_NAME = `
  SELECT *
  FROM restaurants
  WHERE name ILIKE $1
  LIMIT 1
`