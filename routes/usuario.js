const express = require("express");
const { body, param, validationResult } = require("express-validator");
const {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../controllers/usuarioController");

const router = express.Router();

const validarErrores = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};

// Obtener todos los usuarios
router.get("/", getAllUsuarios);

// Obtener un usuario por su ID
router.get("/:id", [param("id").isInt().withMessage("ID inválido")], validarErrores, getUsuarioById);

// Crear un nuevo usuario
router.post(
  "/",
  [
    body("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio"),
    body("email")
      .isEmail()
      .withMessage("El correo electrónico debe ser válido"),
    body("edad")
      .optional()
      .isInt({ min: 0 })
      .withMessage("La edad debe ser un número entero positivo"),
  ],
  validarErrores,
  createUsuario
);

// Actualizar un usuario
router.put(
  "/:id",
  [
    param("id").isInt().withMessage("ID inválido"),
    body("nombre")
      .optional()
      .notEmpty()
      .withMessage("El nombre es obligatorio"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("El correo electrónico debe ser válido"),
    body("edad")
      .optional()
      .isInt({ min: 0 })
      .withMessage("La edad debe ser un número entero positivo"),
  ],
  validarErrores,
  updateUsuario
);

// Eliminar un usuario
router.delete("/:id", [param("id").isInt().withMessage("ID inválido")], validarErrores, deleteUsuario);

module.exports = router;