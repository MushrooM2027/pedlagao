const express = require('express');
const router = express.Router();
const RequestFullfillmentService = require('../Services/requestFullfillmentService');

// Create
router.post('/requestFullfillment', async (req, res) => {
  try {
    const data = req.body;
    const record = await RequestFullfillmentService.create(data);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All
router.get('/requestFullfillment', async (req, res) => {
  try {
    const all = await RequestFullfillmentService.getAll();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get By ID
router.get('/requestFullfillment/:id', async (req, res) => {
  try {
    const record = await RequestFullfillmentService.getById(req.params.id);
    res.json(record);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const record = await RequestFullfillmentService.update(req.params.id, req.body);
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await RequestFullfillmentService.delete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
