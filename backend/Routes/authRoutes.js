const {register,login,getUsers,getUser,updateUser,deleteUser} = require('../Controller/authController');
const express = require('express');
const authMiddleware = require('../MiddleWare/authMiddleware');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);
router.get('/validate', authMiddleware, (req, res) => {
  res.json({ valid: true, user: req.user });
});

module.exports = router;