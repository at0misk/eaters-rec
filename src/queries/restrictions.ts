export const RESTRICTIONS_BY_EATER_IDS = `
  SELECT restrictions.id, restrictions.label
  FROM eaters_restrictions
  JOIN restrictions ON eaters_restrictions.restriction_id = restrictions.id
  WHERE eaters_restrictions.eater_id = ANY($1)
`;