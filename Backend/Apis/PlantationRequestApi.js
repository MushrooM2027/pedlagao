const express = require('express');
const router = express.Router();
const upload = require('../Utils/multer');
const PlantationRequestService = require('../Services/plantationRequestService');

// Create new plantation request
router.post('/plantationRequest', upload.array('LocationImage', 5), async (req, res) => {
  try {
    const newRequest = await PlantationRequestService.createRequest(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all requests
router.get('/plantationRequest', async (req, res) => {
  try {
    const requests = await PlantationRequestService.getAllRequests();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await PlantationRequestService.getRequestById(req.params.id);
    res.json(request);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Get requests by UserId
router.get('/user/:userId', async (req, res) => {
  try {
    const requests = await PlantationRequestService.getRequestsByUserId(req.params.userId);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update request
router.put('/:id', async (req, res) => {
  try {
    await PlantationRequestService.updateRequest(req.params.id, req.body);
    res.json({ message: 'Request updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete request
router.delete('/:id', async (req, res) => {
  try {
    await PlantationRequestService.deleteRequest(req.params.id);
    res.json({ message: 'Request deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Accept request
router.post('/plantationRequest/:id/accept', async (req, res) => {
  try {
    console.log("Request Params:", req.params); // Debug log
    console.log("Request Body:", req.body); // Debug log

    const updated = await PlantationRequestService.markAsAccepted(req.params.id, req.body.UserId);
    res.json(updated);
  } catch (err) {
    console.error("Error in accept route:", err);
    res.status(400).json({ error: err.message });
  }
});

// Cancel request
router.post('/plantationRequest/:id/cancel', async (req, res) => {
  try {
    const updated = await PlantationRequestService.cancelRequest(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
