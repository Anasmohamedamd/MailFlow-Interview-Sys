const {register,login,getUsers,getUser,updateUser,deleteUser} = require('../Controller/authController');
const express = require('express');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

module.exports = router;