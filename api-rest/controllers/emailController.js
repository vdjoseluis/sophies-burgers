// Cuenta de Ethereal: ethereal.email
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");

let contactData = [];

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "elliot.schultz93@ethereal.email",
    pass: "PKVS4G18QewgwMbZpM",
  },
});

const handleContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = req.body;

  if (!data.name && !data.email) {
    res.status(400).json({ message: "Nombre y correo son obligatorios" });
  }
  contactData = [...contactData, data];
  try {
    const attachments = [];
    if (req.file && req.file.mimetype === "application/pdf") {
      attachments.push({
        filename: req.file.originalname,
        path: req.file.path,
      });
    }

    await transporter.sendMail({
      from: `"Admin Sophie's Burgers" <info@sophiesburgers.com>`,
      to: data.email,
      subject: "Gracias por contactarnos",
      html: `<p>Hola ${
        data.name || data.firstname
      },</p><p>Gracias por contactarnos. Nuestro equipo revisará tu mensaje y se pondrá en contacto contigo lo antes posible.</p> <ul> <li>Nombre: ${
        data.name || data.firstname
      }</li> <li>Correo: ${data.email}</li> <li>Teléfono: ${
        data.phone
      }</li> <li>Mensaje: ${data.message || "Solicitud de empleo"}</li> </ul>`,
      attachments,
    });

    res.status(200).send({
      status: "success",
      message: "Correo de confirmación enviado y datos guardados temporalmente",
    });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    res.status(500).json({
      success: false,
      message: "Error al enviar correo de confirmación",
    });
  }
};

const handleRemember = async (req, res) => {
  const data = req.body;
  try {
    await transporter.sendMail({
      from: `"Admin Sophie's Burgers" <info@sophiesburgers.com>`,
      to: data.email,
      subject: "Recuperación de tu cuenta de Sophies Burgers",
      html: `<p>Hola ${data.firstname},</p><p>Gracias por contactarnos. Aquí están tus datos:</p> <ul> <li>Nombre: ${data.firstname} ${data.lastname}</li> <li>Correo: ${data.email}</li> <li><a href="https://sophies-burgers.vercel.app/restore-password/${data.id}" target="_blank">Recuperar contraseña</a></li> </ul>`,
    });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    res.status(500).json({
      success: false,
      message: "Error al enviar correo de confirmación",
    });
  }

  res.status(200).json(contactData);
};

const getContactData = (req, res) => {
  res.status(200).json(contactData);
};

module.exports = { handleContactForm, getContactData, handleRemember };
