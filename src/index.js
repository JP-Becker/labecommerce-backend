"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
// createUser({id: '03', email: 'beltrano@gmail.com', password: '1234567'})
// getAllUsers()
// createProduct({id: '04', name: 'celular', price: 1399, category: PRODUCT.ELECTRONICS})
// getAllProducts()
// getProductById('04')
// queryProductsByName('CeLular')
// createPurchase({userId: '03', productId: '04', quantity: 2, totalPrice: 2798})
(0, database_1.getAllPurchasesFromUserId)('02');
