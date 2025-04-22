const PlantationRequestRepository = require("../Repositories/plantationRequestRepository");
const Users = require('../Models/Users');
const MediaFile = require('../Models/MediaFiles');
const PlantationRequest = require('../Models/PlantationRequest')

const plantationRequestService = {
  createRequest: async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug log
      console.log("Request Files:", req.files);
      const {
        PlantingFor,
        NameOfRequestedPerson,
        TreeType,
        LocationImage,
        NumberOfTrees,
        Description,
        RequestedLocation,
        Amount,
        UserId
      } = req.body;

      const mediaFiles = req.files;

      if (!Amount || isNaN(parseInt(Amount))) {
        throw new Error('Sponsor Coins (Amount) is required and must be a valid number');
      }

      const userId = UserId || (req.user ? req.user.id : null);
      if (!userId) throw new Error('UserId is required');

      const user = await Users.findByPk(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      if(parseInt(Amount)<1){
        return res.status(400).json({ error: 'Insufficient coins to sponsor' });
      }
      if (user.Coins < parseInt(Amount)) {
        return res.status(400).json({ error: 'Insufficient coins to sponsor' });
      }

      user.Coins -= parseInt(Amount);
      await user.save();

      const requestData = {
        UserId: userId,
        PlantingFor,
        NameOfRequestedPerson,
        TreeType,
        RequestType: 'Sponsorship',
        RequestedLocation,
        Description,
        LocationImage,
        NumberOfTrees: parseInt(NumberOfTrees),
        Amount: parseInt(Amount)
      };

      const request = await PlantationRequestRepository.create(requestData);
      console.log("Request Created:", request);
      if (mediaFiles && mediaFiles.length > 0) {
        const mediaRecords = mediaFiles.map(file => ({
          filePath: `plantationRequests/${file.filename}`,
          mimeType: file.mimetype,
          referenceId: request.RequestId,
          referenceType: 'PlantationRequest'
        }));
        await MediaFile.bulkCreate(mediaRecords);
        console.log("Media Files Saved:", mediaRecords);
      }


      return res.status(201).json({ message: 'Request created', request });
    } catch (err) {
      console.error('Error in createRequest:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // ✅ Get all requests
  getAllRequests: async () => {
    return await PlantationRequestRepository.getAll();
  },

  // ✅ Get request by ID
  getRequestById: async (id) => {
    return await PlantationRequestRepository.getById(id);
  },

  // ✅ Get requests by user ID
  getRequestsByUserId: async (userId) => {
    return await PlantationRequestRepository.getByUserId(userId);
  },

  // ✅ Update a request
  updateRequest: async (id, data) => {
    return await PlantationRequestRepository.update(id, data);
  },

  // ✅ Delete a request
  deleteRequest: async (id) => {
    return await PlantationRequestRepository.delete(id);
  },

  markAsAccepted: async (id, userId) => {
    if (!id || !userId) {
      throw new Error("Missing required parameters: id or userId");
    }

    const request = await PlantationRequest.findByPk(id);
    if (!request) {
      throw new Error("Request not found");
    }

    request.IsActive = false;
    request.ClaimedBy = userId; // Ensure this column exists in the database
    await request.save();

    return request;
  },

  cancelRequest: async (id) => {
    const request = await PlantationRequest.findByPk(id);
    if (!request) throw new Error('Request not found');

    request.IsActive = true;
    request.ClaimedBy = null;
    await request.save();
    return request;
  }

};

module.exports = plantationRequestService;
