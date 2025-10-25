// Pastikan authenticateJWT dipakai sebelum middleware ini
module.exports = function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: admin only' });
  }
  next();
};