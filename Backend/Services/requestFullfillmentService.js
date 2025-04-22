const RequestFullfillmentRepository = require('../Repositories/requestFullfillmentRepository');
const Users = require('../Models/Users');
const PlantationRequest = require('../Models/PlantationRequest');

const RequestFullfillmentService = {
    create: async (data) => {
        return await RequestFullfillmentRepository.create(data);
    },
    getAll: async () => {
        return await RequestFullfillmentRepository.getAll({
            include: [
                { model: Users, as: 'user' },
                { model: PlantationRequest, as: 'plantationRequest' }
            ]
        });
    },
    getById: async (id) => {
        const record = await RequestFullfillmentRepository.getById(id);
        if (!record) throw new Error('Fulfillment not found');
        return record;
    },
    update: async (id, data) => {
        await RequestFullfillmentRepository.update(id, data);
        return await RequestFullfillmentRepository.getById(id);
    },
    delete: async (id) => {
        return await RequestFullfillmentRepository.delete(id);
    }
};

module.exports = RequestFullfillmentService;
