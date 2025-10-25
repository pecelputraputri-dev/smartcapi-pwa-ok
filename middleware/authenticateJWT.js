// Middleware JWT sederhana: sesuaikan dengan mekanisme auth project Anda
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split('Bearer ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'default_jwt_secret');
    const user = await User.findById(payload.sub).select('-passwordHash');
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = user;
    next();
  } catch (err) {
    console.error('authenticateJWT error', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};