const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const sequelize = new Sequelize( // CORRECTO
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: "mysql",
    dialectOptions: { connectTimeout: 60000 },
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
);

const db = {};

// Leer todos los archivos en la carpeta models y cargar los modelos
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.slice(-3) === ".js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Si hay asociaciones entre modelos, establecerlas aquí
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Probar la conexión y sincronizar los modelos con la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos con Sequelize.");
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("La base de datos se ha sincronizado correctamente.");
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
};

module.exports = {
  sequelize,
  User: db.User,
  Product: db.Product,
  Ticket: db.Ticket,
  Item: db.Item,
  Table: db.Table,
  Booking: db.Booking,
  syncDatabase,
};
