const bcrypt = require("bcrypt");
const { SALT_ENCRYPT } = require("./constants");

const verifyPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

const hashPassword = (data) => bcrypt.hashSync(data, SALT_ENCRYPT);

module.exports = {
  verifyPassword,
  hashPassword,
};
