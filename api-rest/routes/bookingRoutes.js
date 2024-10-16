const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { adminMiddleware, authMiddleware } = require("../middlewares/authMiddleware");

// Rutas para usuarios
router.post("/create", authMiddleware, bookingController.createBooking);
router.get("/mybookings", authMiddleware, bookingController.getMyActiveBookings);

// Rutas compartidas: reserva propia o role:admin
router.put("/changestatus/:id", authMiddleware, bookingController.changeStatus);

// Rutas para role:admin
router.get("/list", authMiddleware, adminMiddleware, bookingController.getAllBookings);
router.get("/search", authMiddleware, adminMiddleware, bookingController.getBookingByData);

module.exports = router;
