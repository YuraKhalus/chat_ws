const express = require('express');
const User = require('../models/users');  
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { login, password, avatar } = req.body;
    const existingUser = await User.findOne({ login });
    if (existingUser) return res.status(400).json({ message: 'Логін зайнятий' });
    
    const user = new User({ login, password, avatar });
    await user.save();
    res.status(201).json({ 
      message: 'Зареєстровано', 
      user: { id: user._id, login, avatar: user.avatar || null }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Неправильно' });
    }
    res.json({ 
      message: 'Увійшли', 
      user: { id: user._id, login, avatar: user.avatar || null }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
    
module.exports = router;