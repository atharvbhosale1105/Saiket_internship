CREATE DATABASE saiket_internship_db;

USE saiket_internship_db;

CREATE TABLE roles(
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name ENUM('USER','ADMIN')
);

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    role_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(20),
    bio TEXT,
    is_active TINYINT(1) DEFAULT 1,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    CONSTRAINT FK2
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);


CREATE TABLE addresses (
    address_id INT NOT NULL AUTO_INCREMENT,
    user_id INT UNIQUE,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (address_id),
    CONSTRAINT FK1
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


