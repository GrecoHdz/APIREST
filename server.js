const express = require("express");  
const { connectDB, sequelize } = require("./config/database"); 
const usuarioRoutes = require("./routes/usuario"); 
const app = express();   

//Rutas
app.use(express.json());
app.use(express.static('front')); 
app.use("/usuarios", usuarioRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});