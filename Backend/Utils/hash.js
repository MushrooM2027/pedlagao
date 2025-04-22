const bcrypt = require('bcrypt');
module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),
  comparePassword: (plain, hash) => bcrypt.compare(plain, hash)
};