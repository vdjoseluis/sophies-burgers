const { Booking, Table, User } = require("../models/index");
const { Op } = require("sequelize");

const createBooking = async (req, res) => {
  try {
    const user_id = req.user.id; // Obtener el ID del usuario desde el token
    const { date_booking, time_booking, people } = req.body;

    // Buscar la primera mesa disponible que tenga suficiente capacidad
    const availableTable = await Table.findOne({
      where: {
        reserved: 0, // La mesa no debe estar reservada
        people: {
          [Op.gte]: people, // Debe tener suficiente capacidad
        },
      },
      order: [["people", "ASC"]], // Ordenar por capacidad (de menor a mayor)
    });

    if (!availableTable) {
      return res.status(400).json({
        error: "No hay mesas disponibles para la cantidad de personas.",
      });
    }

    // Crear la reserva
    const booking = await Booking.create({
      user_id,
      table_id: availableTable.id, // Asignar la mesa encontrada
      date_booking,
      time_booking,
      people,
    });

    // Marcar la mesa como reservada
    availableTable.reserved = 1; // Cambiar el estado a reservado
    await availableTable.save();

    res.status(201).json({
      message: "Reserva creada con éxito",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al crear la reserva",
      details: error.message,
    });
  }
};

const getMyActiveBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.findAll({
      where: { user_id: userId, status: "active" },
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: "No tienes reservas" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la reserva" });
  }
};

const changeStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const newStatus = req.body.status;
    const userRole = req.user.role;

    // buscar la reserva
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    if (userRole !== "admin" && req.user.id !== booking.user_id) {
      return res.status(403).json({
        error: "No tienes permisos para esta reserva",
      });
    }

    // validar si el nuevo estado es valido
    if (!["cancelled", "done"].includes(newStatus)) {
      return res.status(400).json({ error: "El nuevo estado no es valido" });
    }

    if (newStatus === "done" && userRole !== "admin") {
      return res
        .status(403)
        .json({ error: "No tienes permisos para realizar esta accion" });
    }

    // actualizar status de la reserva
    booking.status = newStatus;
    await booking.save();

    // liberar mesa
    const table = await Table.findByPk(booking.table_id);
    if (!table) {
      return res.status(404).json({ error: "Mesa no encontrada" });
    }
    table.reserved = 0;
    await table.save();

    res
      .status(200)
      .json({ message: `Reserva actualizada correctamente a ${newStatus}` });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la reserva" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
};

const getBookingByData = async (req, res) => {
  try {
    const { phone, id } = req.body;
    if (!phone && !id) {
      return res
        .status(400)
        .json({ error: "Faltan datos: teléfono o ID de la reserva" });
    }

    let booking;
    if (id) {
      booking = await Booking.findByPk(id);
    } else if (phone) {
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      booking = await Booking.findAll({ where: { user_id: user.id } });
    }

    if (!booking) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la reserva" });
  }
};

module.exports = {
  createBooking,
  getMyActiveBookings,
  changeStatus,
  getAllBookings,
  getBookingByData,
};
