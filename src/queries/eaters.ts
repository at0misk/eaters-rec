export const ALL_EATERS_QUERY = `SELECT * FROM eaters`;
export const GET_EATERS_BY_NAME = `SELECT * FROM eaters WHERE name ILIKE ANY($1)`;