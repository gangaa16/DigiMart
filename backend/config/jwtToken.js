const jwt = require("jsonwebtoken");

// Use a separate secret for access tokens
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = { generateToken };
