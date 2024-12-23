const db = require('../config/db');

const addPassword = async (userId, accountName, username, encryptedPassword, url, category) => {
  const result = await db.query(
    `INSERT INTO passwords (user_id, account_name, username, encrypted_password, url, category)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [userId, accountName, username, encryptedPassword, url, category]
  );
  return result.rows[0];
};

const getPasswords = async (userId) => {
  const result = await db.query('SELECT * FROM passwords WHERE user_id = $1', [userId]);
  return result.rows;
};

const deletePassword = async (id, userId) => {
  await db.query('DELETE FROM passwords WHERE id = $1 AND user_id = $2', [id, userId]);
};

const updatePassword = async (id, userId, accountName, username, encryptedPassword, url, category) => {
  const result = await db.query(
    `UPDATE passwords
     SET account_name = $1, username = $2, encrypted_password = $3, url = $4, category = $5, updated_at = CURRENT_TIMESTAMP
     WHERE id = $6 AND user_id = $7
     RETURNING *`,
    [accountName, username, encryptedPassword, url, category, id, userId]
  );
  return result.rows[0];
};

module.exports = { addPassword, getPasswords, deletePassword, updatePassword };
