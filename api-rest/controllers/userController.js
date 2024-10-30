const { User } = require("../models/index");
const generateToken = require("../services/jwt");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const params = req.body;

  console.log("Datos del body: ", req.body);
  try {
    console.log("buscando usuario existente con email: ", params.email);
    const existingUser = await User.findOne({ where: { email: params.email }});
    if (existingUser) {
      console.log("usuario ya existe", params.email);
      return res.status(400).json({
        status: "error",
        message: "El usuario ya existe",
      });
    }
    console.log("NO EXISTE, creando un nuevo usuario");

    const newUser = await User.create(params);

    console.log("nuevo usuario creado: ", newUser.id);

    res.status(200).send({
      status: "success",
      message: "Usuario creado correctamente",
      user: newUser,
    });
  } catch (error) {
    console.log("error al registrar el usuario: ", error);
    res.status(500).json({
      error: "Error en el servidor",
    });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "El usuario no existe",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Usuario o contraseña es incorrectos",
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.status(200).send({
      status: "success",
      message: "Usuario autenticado correctamente",
      user: {
        id: user.id,
        name: user.firstname,
        role: user.role,
      }, 
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error en el servidor",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los usuarios",
    });
  }
};

const getUserByData = async (req, res) => {
  try {
    const { id, phone } = req.query;
    const userRole = req.user.role;
    const userIdFromToken = req.user.id;

    let user;

    if (id) {
      user = await User.findByPk(id);
    } else if (phone) {
      user = await User.findOne({ where: { phone } });
    } else {
      return res.status(400).json({
        error: "Debes proporcionar un id o email para buscar el usuario.",
      });
    }

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    if (userRole !== "admin" && user.id !== userIdFromToken) {
      return res.status(403).json({
        error: "No tienes permisos para ver los datos de este usuario.",
      });
    }

    return res.status(200).send({
      status: "success",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener los datos del usuario." });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const {email} = req.query;
    const user = await User.findOne({ where: { email }, attributes: ["id", "firstname", "lastname", "email"] }); 
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).send({
      status: "success",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener los datos del usuario" });
  }
};

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = parseInt(req.params.id, 10); 
    const params = { ...req.body };
    params.id && delete params.id;

    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({
        error: "No tienes permisos para actualizar este usuario",
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }
    await user.update(params);
    res.status(200).send({
      status: "success",
      message: "Usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el usuario",
    });
  }
};

const restorePassword = async (req, res) => {
  try {    
    const {id} = req.params;
    const {password} = req.body;
    if (!password) {
      return res.status(400).json({
        error: "La contraseña es requerida",
      });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }
    await user.update({ password: password }); 
    await user.save();
    res.status(200).send({
      status: "success",
      message: "Contraseña restablecida correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al restablecer la contraseña",
    });
  }
};

const deleteUser = async (req, res) => {
  console.log(req.user);
  try {
    const userId = parseInt(req.params.id, 10);
    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({
        error: "No tienes permisos para eliminar este usuario",
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }
    await user.destroy();
    res.status(200).send({
      status: "success",
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el usuario"
    });
  }
};

const uploadCv = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se ha seleccionado un archivo" });
    }
    const fileExt = req.file.mimetype.split('/')[1];

    if (fileExt !== "pdf") {
      const filePath = req.file.path;
      fs.unlinkSync(filePath);
      return res
        .status(400)
        .json({ error: "El formato del archivo debe ser PDF" });
    }
    
    return res.status(200).json({
      status: "success",
      message: "CV subido correctamente",
      filename: req.file.filename
    })
    
  } catch (error) {
    res.status(500).json({
      error: "Error al subir el archivo"
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserByData,
  getUserByEmail,
  updateUser,
  restorePassword,
  deleteUser,
  uploadCv
};
