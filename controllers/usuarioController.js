const Usuario = require("../models/Usuario");

// Obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    if (!usuarios || usuarios.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

// Obtener un usuario por su ID
const getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  const { nombre, email, edad } = req.body;

  try {
    const usuario = await Usuario.create({
      nombre,
      email,
      edad,
    });

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, edad } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await usuario.update({
      nombre,
      email,
      edad,
    });

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await usuario.destroy();
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};