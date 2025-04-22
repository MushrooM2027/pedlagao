const {Op} = require('sequelize');
const User = require('../Models/Users');

const UserRepository = {
  create: (data) => User.create(data),
  findByUserNameOrEmail: (identifier) => {
    return User.findOne({
      where: {
        [Op.or]: [{
          Username: identifier
        },
        {
          Email: identifier
        }]
      }
    })
  },
  findByUserName: (Username) => User.findOne({ where: { Username: Username } }),
  findByEmail: (Email) => User.findOne({ where: { Email: Email } }),
  findByPhone: (Phone) => User.findOne({ where: { Phone: Phone } }),
  getAll:()=>User.findAll(),
  getById: (id) => User.findByPk(id)
};

module.exports = UserRepository;