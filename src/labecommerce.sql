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


CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT, 
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES clients (id)
);

DROP TABLE purchases;

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id) 
VALUES 
    ("pu001", 20, 1, NULL,"u001"),
    ("pu002", 2999, 0, NULL,"u001"),
    ("pu003", 98, 0, NULL,"u002"),
    ("pu004", 45, 0, NULL,"u003");

UPDATE purchases
SET delivered_at = datetime('now')
WHERE id="pu001";

SELECT 
users.id AS clientID,
users.email,
users.password,
purchases.*
FROM users
INNER JOIN purchases
ON purchases.buyer_id = users.id;

-- Criação da tabela de relações
CREATE TABLE purchases_products
(purchase_id TEXT NOT NULL, 
product_id TEXT NOT NULL,
quantity INTEGER NOT NULL,
FOREIGN KEY (purchase_id) REFERENCES purchases(id),
FOREIGN KEY (product_id) REFERENCES products(id));

DROP TABLE purchases_products;

SELECT * FROM purchases_products;

--Exercicio 2
--Popule sua tabela purchases_products simulando 3 compras de clientes.
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES ("pu001","p031", 2), 
("pu002","p012", 1), 
("pu004","p093", 3);

SELECT * FROM purchases_products;

-- Mostre em uma query todas as colunas das tabelas relacionadas (purchases_products, purchases e products).
SELECT 
purchases.id AS purchaseID,
products.id AS productId,
products.name AS productName,
purchases_products.quantity,
purchases.buyer_id,
purchases.total_price
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;

