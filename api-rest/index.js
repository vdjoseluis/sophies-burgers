require("dotenv").config();

const express = require("express");
const cors = require("cors");
const UserRoutes = require("./routes/userRoutes");
const ProductRoutes = require("./routes/productRoutes");
const { syncDatabase } = require("./models/index");

console.log("Node API booted");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserRoutes);
app.use("/api/product", ProductRoutes);

// PRUEBA CONEXION A LA BASE DE DATOS
app.get("/", (req, res) => {
  res.send("Welcome to Sophies Burgers API!");
});

const startServer = async () => {
  try {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
