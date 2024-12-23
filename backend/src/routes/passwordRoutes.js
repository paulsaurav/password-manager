const express = require('express');
const { addPasswordHandler, getPasswordsHandler, deletePasswordHandler, updatePasswordHandler } = require('../controllers/passwordController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, addPasswordHandler); 
router.get('/', authenticate, getPasswordsHandler); 
router.delete('/:id', authenticate, deletePasswordHandler); 
router.put('/:id', authenticate, updatePasswordHandler);

module.exports = router;
