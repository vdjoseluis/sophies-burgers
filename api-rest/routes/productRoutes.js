const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { adminMiddleware, authMiddleware } = require("../middlewares/authMiddleware");
const { body } = require("express-validator");

// Rutas protegidas role:admin
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Nombre producto obligatorio"),
    body("price")
      .notEmpty()
      .isNumeric()
      .withMessage("Precio producto obligatorio"),
  ],
  authMiddleware, adminMiddleware,
  productController.registerProduct
);
router.get("/list", authMiddleware, adminMiddleware, productController.getAllProducts);
router.get("/:id", authMiddleware, adminMiddleware, productController.getProductById);
router.put("/update/:id", authMiddleware, adminMiddleware, productController.updateProduct);
router.delete("/delete/:id", authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;
