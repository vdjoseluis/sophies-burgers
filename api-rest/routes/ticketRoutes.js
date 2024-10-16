const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const { adminMiddleware, authMiddleware } = require("../middlewares/authMiddleware");
const { body } = require("express-validator");

// Rutas para usuarios
router.post("/create", authMiddleware, ticketController.createTicket);

// Rutas protegidas role:admin
router.get("/list", authMiddleware, adminMiddleware, ticketController.getAllTickets);


module.exports = router;
