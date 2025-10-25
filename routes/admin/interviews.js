const express = require('express');
const router = express.Router();
const isAdmin = require('../../middleware/isAdmin');
const Interview = require('../../models/Interview');

router.use(isAdmin);

// GET /admin/interviews
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find({});
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /admin/interviews
router.post('/', async (req, res) => {
  try {
    const itv = new Interview(req.body);
    await itv.save();
    res.status(201).json(itv);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /admin/interviews/:id
router.put('/:id', async (req, res) => {
  try {
    const itv = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!itv) return res.status(404).json({ message: 'Not found' });
    res.json(itv);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /admin/interviews/:id
router.delete('/:id', async (req, res) => {
  try {
    const itv = await Interview.findByIdAndDelete(req.params.id);
    if (!itv) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;