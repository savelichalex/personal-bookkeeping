import { runQuery } from '../../db';

export const createNewRecord = (type, amount, note, category) => {
  const created = Date.now();

  const columns = 'type, amount, note, created, category';
  const values = `"${type}", ${amount}, "${note}", ${created}, ${category}`;

  const query = `INSERT INTO Records (${columns}) VALUES (${values})`;

  return runQuery(query);
};


export const updateRecord = (id, amount, note, category) => {
  const query = `
    UPDATE Records
    SET amount = ${amount}, note = "${note}", category = ${category}
    WHERE id = ${id}
  `;

  return runQuery(query);
};
