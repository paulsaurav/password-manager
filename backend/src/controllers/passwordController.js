const { addPassword, getPasswords, deletePassword, updatePassword } = require('../models/password');
const { encrypt, decrypt } = require('../utils/encryption');

const addPasswordHandler = async (req, res) => {
  const { account_name, username, password, url, category } = req.body;
  const userId = req.userId;

  try {
    const encryptedPassword = encrypt(password);
    const newPassword = await addPassword(userId, account_name, username, encryptedPassword, url, category);
    res.status(201).json(newPassword);
  } catch (error) {
    console.error('Error adding password:', error.message);
    res.status(500).json({ error: 'Failed to add password' });
  }
};

const getPasswordsHandler = async (req, res) => {
  const userId = req.userId;

  try {
    const passwords = await getPasswords(userId);
    const decryptedPasswords = passwords.map((entry) => ({
      ...entry,
      password: decrypt(entry.encrypted_password),
    }));

    res.status(200).json(decryptedPasswords);
  } catch (error) {
    console.error('Error fetching passwords:', error.message);
    res.status(500).json({ error: 'Failed to fetch passwords' });
  }
};

const deletePasswordHandler = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    await deletePassword(id, userId);
    res.status(200).json({ message: 'Password deleted successfully' });
  } catch (error) {
    console.error('Error deleting password:', error.message);
    res.status(500).json({ error: 'Failed to delete password' });
  }
};
const updatePasswordHandler = async (req, res) => {
  const { id } = req.params;
  const { account_name, username, password, url, category } = req.body;
  const userId = req.userId;

  try {
    const encryptedPassword = encrypt(password);
    const updatedPassword = await updatePassword(id, userId, account_name, username, encryptedPassword, url, category);

    if (!updatedPassword) {
      return res.status(404).json({ error: 'Password entry not found or unauthorized' });
    }

    res.status(200).json(updatedPassword);
  } catch (error) {
    console.error('Error updating password:', error.message);
    res.status(500).json({ error: 'Failed to update password' });
  }
};

module.exports = {
  addPasswordHandler,
  getPasswordsHandler,
  deletePasswordHandler,
  updatePasswordHandler
};
