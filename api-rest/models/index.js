const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Desactiva el logging de Sequelize
    }
);

const db = {};

// Leer todos los archivos en la carpeta models y cargar los modelos
fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js' && file.slice(-3) === '.js')
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

// Si hay asociaciones entre modelos, establecerlas aquí
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Probar la conexión y sincronizar los modelos con la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos con Sequelize.');
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // Cambia a true si quieres reiniciar las tablas force:false
        console.log('La base de datos se ha sincronizado correctamente.');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
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
