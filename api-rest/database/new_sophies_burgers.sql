CREATE DATABASE IF NOT EXISTS new_sophies_burgers;
USE new_sophies_burgers;

CREATE TABLE IF NOT EXISTS products (
id INT PRIMARY KEY auto_increment,
name VARCHAR(60) NOT NULL,
price FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(80) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    deliveryEnabled TINYINT(1) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    people INT NOT NULL,
    reserved TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    table_id INT,
    date_booking DATE NOT NULL,
    time_booking TIME NOT NULL,
    people INT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users(id),
    CONSTRAINT fk_table
        FOREIGN KEY (table_id)
        REFERENCES tables(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'cancelled', 'done') NOT NULL DEFAULT 'active',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,    
    user_id INT,
    CONSTRAINT fk_userT FOREIGN KEY (user_id) REFERENCES users(id),
    total FLOAT NOT NULL,
    delivery_option ENUM('pickup', 'delivery') NOT NULL DEFAULT 'pickup',
    status ENUM('pending', 'done') NOT NULL DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT,
    CONSTRAINT fk_ticket FOREIGN KEY (ticket_id) REFERENCES tickets(id),
    product_id INT,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id),
    quantity INT NOT NULL
);

INSERT INTO products (name, price) VALUES
    ('Hamburguesa Clásica', 5.99),
    ('Hamburguesa con Queso', 6.99),
    ('Hamburguesa Doble', 7.99),
    ('Hamburguesa de Pollo', 5.49),
    ('Hamburguesa Vegetariana', 6.49),
    ('Papas Fritas', 2.99),
    ('Papas kebab', 3.95),
    ('Refresco Pequeño', 1.99),
    ('Refresco Mediano', 2.49),
    ('Refresco Grande', 2.99),
    ('Cerveza', 2.49),
    ('Pizza mediana', 12.99),  
    ('Ensalada de la Casa', 4.99),
    ('Hamburguesa de Ternera Premium', 8.99),
    ('Hamburguesa con Bacon', 7.49),
    ('Hamburguesa Vegana', 6.99),
    ('Hamburguesa de Pavo', 6.49),
    ('Batido de Chocolate', 3.99),
    ('Batido de Fresa', 3.99),
    ('Batido de Vainilla', 3.99),
    ('Perrito Caliente', 4.99),
    ('Aros de Cebolla', 3.49);

INSERT INTO tables (people) VALUES
(8), (8), (8),
(6), (6), (6),
(4), (4), (4), (4),
(2), (2), (2), (2);
