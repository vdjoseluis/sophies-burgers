const { Product } = require("../models/index");
const { validationResult } = require("express-validator");

const registerProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const params = req.body;

  console.log("Datos del body: ", req.body);
  try {
    const product = await Product.create(params);

    res.status(200).json({
      message: "Producto registrado correctamente",
      product,
    });
  } catch (error) {
    console.log("error al registrar el producto: ", error);
    res.status(500).json({
      error: "Error en el servidor",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los productos",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el producto",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const params = { ...req.body };
    params.id && delete params.id;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }
    await product.update(params);
    res.status(200).json({
      message: "Producto actualizado correctamente",
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el producto",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }
    await product.destroy();
    res.status(200).json({
      message: "Producto eliminado correctamente",
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el producto",
    });
  }
};

module.exports = {
  registerProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
