
export const _TableNameProducts = 'products'

export const _TableCreateProducts = `
  CREATE TABLE IF NOT EXISTS ${_TableNameProducts} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
  );
`
