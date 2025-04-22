const PlantationRequest = require('../Models/PlantationRequest');
const Users = require('../Models/Users');
const MediaFile = require('../Models/MediaFiles')

const PlantationRequestRepository = {
  // Create a new request
  create: async (data) => {
    return PlantationRequest.create({
      UserId: data.UserId,
      PlantingFor: data.PlantingFor,
      NameOfRequestedPerson: data.NameOfRequestedPerson,
      TreeType: data.TreeType,
      RequestedLocation: data.RequestedLocation,
      Description: data.Description,
      LocationImage: data.LocationImage,
      NumberOfTrees: data.NumberOfTrees,
      Amount: data.Amount,
      RequestType: data.RequestType || 'Sponsorship',
    });
  },

  // Get all requests
  getAll: () => {
    return PlantationRequest.findAll({
      include: [
        {
          model: Users,
          as: 'user',
          attributes: ['Name', 'UserId'],
          include: [
            {
              model: MediaFile,
              as: 'profileMedia', // alias (you must define this in the association)
              where: { referenceType: 'User' },
              required: false, // so it still works even if user has no profile pic
            }
          ]
        }, {
          model: MediaFile,
          as: 'plantationMedia',
          where: { referenceType: 'PlantationRequest' },
          required: false,
          attributes: ['filePath']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  },

  // Get request by ID
  getById: (id) => {
    return PlantationRequest.findByPk(id);
  },

  // Get all requests for a specific user
  getByUserId: (userId) => {
    return PlantationRequest.findAll({
      where: { UserId: userId },
      order: [['createdAt', 'DESC']]
    });
  },

  // Update a request
  update: (id, data) => {
    return PlantationRequest.update(data, { where: { RequestId: id } });
  },

  // Delete a request
  delete: (id) => {
    return PlantationRequest.destroy({ where: { RequestId: id } });
  }
};

module.exports = PlantationRequestRepository;
