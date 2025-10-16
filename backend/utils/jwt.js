const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "supersecret"; // move to .env in production

function generateToken(userId) {
  return jwt.sign({ id: userId }, secret, { expiresIn: "1h" });
}

function verifyToken(token) {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });
}

module.exports = { generateToken, verifyToken };
