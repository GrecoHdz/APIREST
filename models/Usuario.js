const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Asegura que el correo electrónico sea único
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true, // La edad es opcional
    },
  },
  {
    timestamps: false, // Desactiva los timestamps automáticos de Sequelize
    tableName: "Usuario", // Nombre de la tabla en la base de datos
  }
);

module.exports = Usuario;