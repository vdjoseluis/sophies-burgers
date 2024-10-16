const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  registerValidation,
  loginValidation,
  searchValidation,
} = require("../validators/userValidation");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

// Rutas públicas
router.post("/register", registerValidation, userController.registerUser);
router.post("/login", loginValidation, userController.loginUser);

// Rutas compartidas: propias o role: admin
router.get("/search", searchValidation, authMiddleware, userController.getUserByData);
router.put("/update/:id", authMiddleware, userController.updateUser);
router.delete("/delete/:id", authMiddleware, userController.deleteUser);

// Rutas privadas o role: admin
router.get("/list", authMiddleware, adminMiddleware, userController.getAllUsers);

module.exports = router;
