export const chunk = (arr, len) => {
  const chunks = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
};

export const mapDbRows = (rows) => {
  const result = new Array(rows.length);

  for(var x = 0; x < rows.length; x++) {
    result[x] = rows.item(x);
  }

  return result;
};
