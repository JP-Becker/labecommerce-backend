-- Active: 1673886755071@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES 
    ("u001", "beltrano@email.com", "beltrano2001"),
	("u002", "fulana@email.com", "fulana2001"),
	("u003", "ciclano@email.com", "ciclano99");

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT  NOT NULL 
);


INSERT INTO products (id, name, price, category)
VALUES
    ("p031", "arroz", 10, "Comidas"),
    ("p093", "feijão", 15, "Comidas"),
    ("p012", "Iphone", 2999, "Eletrônicos"),
    ("p121", "Tênis", 149, "Roupas e calçados"),
    ("p123", "Camiseta", 49, "Roupas e calçados");


CREATE TABLE purchases (
    userId TEXT NOT NULL,
    productId TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    totalPrice INTEGER NOT NULL
);

DROP TABLE purchases;

INSERT INTO purchases (userId, productId, quantity, totalPrice)
VALUES
    ('u001', 'p031', 2, 20),
    ('u001', 'p093', 3, 45),
    ('u003', 'p121', 1, 149),
    ('u002', 'p012', 2, 5998),
    ('u003', 'p123', 5, 245);
    

SELECT * FROM users;

SELECT * FROM users
WHERE id = "u001";

SELECT * FROM products;

SELECT * FROM products
WHERE id = "p031";

DELETE from users
WHERE id = "u001";

DELETE from products
WHERE id = "p031";

UPDATE users
SET email = "changedemail@test.com"
WHERE id = "u001";


UPDATE products
SET name = "arroz integral"
WHERE id = "p031";

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

SELECT * FROM products
WHERE price >=100 AND price <=300

SELECT * FROM purchases;


-- CREATE TABLE purchases_products (
--     purchase_id TEXT NOT NULL,
--     product_id TEXT NOT NULL,
--     quantity INTEGER NOT NULL
-- );

-- INSERT INTO purchases_products (purchase_id, product_id, quantity)
-- VALUES 
--     ("purchase1", "p031", 2),
--     ("purchase2", "p093", 3),
--     ("purchase3", "p121", 1);

