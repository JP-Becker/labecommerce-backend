-- Active: 1673886755071@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES 
    ("01", "beltrano@email.com", "beltrano2001"),
	("02", "fulana@email.com", "fulana2001"),
	("03", "ciclano@email.com", "ciclano99");


SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
    ("031", "arroz", 10, "Comidas"),
    ("093", "feijão", 15, "Comidas"),
    ("012", "Iphone", 2999, "Eletrônicos"),
    ("0121", "Tênis", 149, "Roupas e calçados"),
    ("0123", "Camiseta", 49, "Roupas e calçados");


-- CREATE TABLE purchases (
--     userId TEXT PRIMARY KEY NOT NULL,
--     productId TEXT NOT NULL,
--     quantity REAL NOT NULL,
--     totalPrice REAL NOT NULL
-- );

-- INSERT INTO purchases (userId, productId, quantity, totalPrice)
-- VALUES
--     ("01", "031", 3, 30),
--     ("01", "093", 4, 60),
--     ("03", "012", 1, 2999),
--     ("02", "0123", 2, 98),
--     ("03", "0121", 1, 149);

