const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_KEY;

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = generateToken;
