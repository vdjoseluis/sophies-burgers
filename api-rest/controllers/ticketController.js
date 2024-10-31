const { Ticket, Item, Product } = require("../models/index");

const createTicket = async (req, res) => {
    try {
      const user_id = req.user.id;
      const { delivery_option, items } = req.body;
  
      if (!items || items.length === 0) {
        return res.status(400).json({ error: "Debes agregar al menos un item." });
      }
  
      let total = 0;
      const itemData = [];
  
      for (const item of items) {
        const product = await Product.findByPk(item.product_id);
        if (!product) {
          return res.status(400).json({ error: `Producto con id ${item.product_id} no encontrado.` });
        }
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        itemData.push({
          ticket_id: null, 
          product_id: item.product_id,
          quantity: item.quantity
        });
      }
  
      const ticket = await Ticket.create({
        user_id,
        delivery_option 
      });
  
      for (const item of itemData) {
        item.ticket_id = ticket.id; 
      }
  
      await Item.bulkCreate(itemData); 
  
      await ticket.update({ total }); 
  
      res.status(201).send({
        status: "success",
        message: "Ticket y items creados con éxito",
        ticket,
        items: itemData
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al crear el ticket",
        details: error.message
      });
    }
  };

  const getAllTickets = async (req, res) => {
    try {
      const tickets = await Ticket.findAll({ order: [["createdAt"]] });
      res.status(200).send({
        status: "success",
        tickets
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const changeStatus = async (req, res) => {
    try {
      const ticketId = req.params.id;
      const newStatus = req.body.status;

      const ticket = await Ticket.findByPk(ticketId);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket no encontrado" });
      }
      await ticket.update({ status: newStatus });
      res.status(200).send({
        status: "success",
        message: "Ticket actualizado correctamente",
        ticket
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createTicket,
    getAllTickets,
    changeStatus
  };