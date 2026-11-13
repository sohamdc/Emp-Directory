const pool = require('../config/db');





const getAll = async () => {
  const { rows } = await pool.query('SELECT * FROM employees ORDER BY id DESC');
  return rows;
};



const create = async ({ name, email, role }) => {
  const { rows } = await pool.query(
    'INSERT INTO employees (name, email, role) VALUES ($1, $2, $3) RETURNING *',
    [name, email, role]
  );
  return rows[0];
};

const update = async (id, { name, email, role }) => {
  const { rows } = await pool.query(
    'UPDATE employees SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
    [name, email, role, id]
  );
  return rows[0];
};


const remove = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM employees WHERE id = $1', [id]);
  return rowCount > 0;
};

module.exports = { getAll, create, update, remove };