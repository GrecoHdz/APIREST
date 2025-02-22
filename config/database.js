const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false, 
});

// Probar conexión
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Si hay Conexion base de datos.");
  } catch (error) {
    console.error("No hay Conexion base de datos:", error);
  }
};

module.exports = { sequelize, connectDB };
