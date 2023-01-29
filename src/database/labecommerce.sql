-- Active: 1674496127077@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

DROP TABLE users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT  NOT NULL,
    image_url TEXT NOT NULL
);

DROP TABLE products;

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    createad_at TEXT DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

DROP TABLE purchases;

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL, 
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    FOREIGN KEY (product_id) REFERENCES products(id)
);

DROP TABLE purchases_products;

INSERT INTO users (id, name, email, password)
VALUES 
    ("u001", "beltrano", "beltrano@email.com", "beltrano2001"),
	("u002", "fulana", "fulana@email.com", "fulana2001"),
	("u003", "ciclano", "ciclano@email.com", "ciclano99");


INSERT INTO products (id, name, price, category, image_url)
VALUES
    ("p001", "arroz", 10, "Comidas", "https://picsum.photos/200/300"),
    ("p002", "feijão", 15, "Comidas", "https://picsum.photos/200/300"),
    ("p003", "Iphone", 2999, "Eletrônicos", "https://picsum.photos/200/300"),
    ("p004", "Tênis", 149, "Roupas e calçados", "https://picsum.photos/200/300"),
    ("p005", "Camiseta", 49, "Roupas e calçados", "https://picsum.photos/200/300");

INSERT INTO purchases (id, buyer, total_price) 
VALUES 
    ("pu001", "u001", 40),
    ("pu002", "u001", 45),
    ("pu003", "u003", 98),
    ("pu004", "u002", 2999),
    ("pu005", "u001", 298),
    ("pu006", "u002", 20);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES 
    ("pu001", "p001", 4),
    ("pu002", "p002", 3),
    ("pu003", "p005", 2),
    ("pu004", "p003", 1),
    ("pu005", "p004", 2),
    ("pu006", "p001", 1);


-- SELECT * FROM users;

-- SELECT * FROM users
-- WHERE id = "u001";

-- SELECT * FROM products;

-- SELECT * FROM products
-- WHERE id = "p031";

-- DELETE from users
-- WHERE id = "u001";

-- DELETE from products
-- WHERE id = "p031";

-- UPDATE users
-- SET email = "changedemail@test.com"
-- WHERE id = "u001";


-- UPDATE products
-- SET name = "arroz integral"
-- WHERE id = "p031";

-- SELECT * FROM users
-- ORDER BY email ASC;

-- SELECT * FROM products
-- ORDER BY price ASC
-- LIMIT 20 OFFSET 0;

-- SELECT * FROM products
-- WHERE price >=100 AND price <=300;


-- SELECT * FROM purchases;

-- SELECT 
-- users.id AS userID,
-- users.email,
-- users.name,
-- purchases.*
-- FROM purchases
-- INNER JOIN users
-- ON purchases.buyer_id = users.id
-- AND purchases.email = users.email
-- AND purchases.name = users.name
-- ;

-- SELECT 
-- purchases.id AS purchaseID,
-- products.id AS productId,
-- products.name AS productName,
-- purchases_products.quantity,
-- purchases.buyer_id,
-- purchases.total_price
-- FROM purchases_products
-- INNER JOIN purchases
-- ON purchases_products.purchase_id = purchases.id
-- INNER JOIN products
-- ON purchases_products.product_id = products.id;

