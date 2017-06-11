import { runQuery } from '../../db';

export const createNewRecord = (type, amount, note, category) => {
  let rows;
  let values;

  const created = Date.now();

  if (note === '') {
    rows = 'type, amount, created, category';
    values = `"${type}", ${amount}, ${created}, ${category}`;
  } else {
    rows = 'type, amount, note, created, category';
    values = `"${type}", ${amount}, "${note}", ${created}, ${category}`;
  }

  const query = `INSERT INTO Records (${rows}) VALUES (${values})`;

  return runQuery(query);
};
