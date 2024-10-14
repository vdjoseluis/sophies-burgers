const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_KEY;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      error: "Token no proporcionado",
    });
  }

  const token = authHeader; 

  if (!token) {
    return res.status(403).json({
      error: "Acceso denegado. Token no proporcionado",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: "Token no válido",
      });
    }
    req.user = decoded;
    next();
  });
};

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // Si el usuario es admin, continúa
  } else {
    return res
      .status(403)
      .json({ message: "Acceso denegado. Se requiere rol de administrador." });
  }
};

module.exports = { authMiddleware, adminMiddleware };
