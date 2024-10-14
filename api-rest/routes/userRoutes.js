const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  registerValidation,
  loginValidation,
} = require("../validators/userValidation");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

// Rutas públicas
router.post("/register", registerValidation, userController.registerUser);
router.post("/login", loginValidation, userController.loginUser);

// Rutas privadas o role: admin
router.get("/list", authMiddleware, adminMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/update/:id", authMiddleware, userController.updateUser);
router.delete("/delete/:id", authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
