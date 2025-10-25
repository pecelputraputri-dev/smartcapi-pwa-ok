const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const isAdmin = require('../../middleware/isAdmin');
const User = require('../../models/User');

// Route-level: assume app mounts authenticateJWT then this file
router.use(isAdmin);

// GET /admin/users?role=enumerator
router.get('/', async (req, res) => {
  try {
    const filter = req.query.role ? { role: req.query.role } : {};
    const users = await User.find(filter).select('-passwordHash');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /admin/users
router.post('/', async (req, res) => {
  const { email, username, name, role, password } = req.body;
  if (!email || !username || !role) return res.status(400).json({ message: 'email, username and role are required' });
  try {
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
    const user = new User({ email, username, name, role, passwordHash });
    await user.save();
    res.status(201).json({ message: 'User created', id: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /admin/users/:id
router.put('/:id', async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.passwordHash = await bcrypt.hash(updates.password, 10);
      delete updates.password;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /admin/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;