const { options } = require('joi');
const RequestFullfillment = require('../Models/RequestFullfillment');

const RequestFullfillmentRepository = {
  create: (data) => RequestFullfillment.create(data),
  getAll: (options={}) => RequestFullfillment.findAll(options),
  getById: (id) => RequestFullfillment.findByPk(id),
  update: (id, data) => RequestFullfillment.update(data, { where: { FullfillId: id } }),
  delete: (id) => RequestFullfillment.destroy({ where: { FullfillId: id } })
};

module.exports = RequestFullfillmentRepository;
