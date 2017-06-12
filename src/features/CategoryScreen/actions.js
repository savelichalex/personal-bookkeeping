import { runQuery } from '../../db';

export const createNewCategory = (name, useInBalance, icon) => {
  const columns = 'name, use_in_balance, icon';
  const values = `"${name}", ${useInBalance ? 1 : 0}, "${icon}"`;

  const query = `INSERT INTO Categories (${columns}) VALUES (${values})`;

  return runQuery(query)
    .then(([, res]) => res.insertId);
};
