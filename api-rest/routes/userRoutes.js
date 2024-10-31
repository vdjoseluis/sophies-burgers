const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/userController");

const {
  userValidation,
  loginValidation,
  searchValidation,
} = require("../validators/userValidation");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, "cv" + Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos en formato PDF"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

// Rutas públicas
router.post("/register", userValidation, userController.registerUser);
router.post("/login", loginValidation, userController.loginUser);
router.post("/upload-cv", upload.single("file0"), userController.uploadCv);
router.get("/remember", userController.getUserByEmail);
router.put("/restore-password/:id", userController.restorePassword);
router.post("/validate-address", userController.validateAddress);

// Rutas compartidas: propias o role: admin
router.get(
  "/search",
  searchValidation,
  authMiddleware,
  userController.getUserByData
);
router.put(
  "/update/:id",
  userValidation,
  authMiddleware,
  userController.updateUser
);
router.delete("/delete/:id", authMiddleware, userController.deleteUser);

// Rutas privadas o role: admin
router.get(
  "/list",
  authMiddleware,
  adminMiddleware,
  userController.getAllUsers
);

module.exports = router;
