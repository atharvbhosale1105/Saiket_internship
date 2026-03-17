CREATE DATABASE saiket_internship;

USE saiket_internship;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40),
    email VARCHAR(40) UNIQUE NOT NULL,
    age INT ,
    CHECK(age > 15)
);

DESC users;

SELECT * FROM users;