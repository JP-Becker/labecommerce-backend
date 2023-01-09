"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { createUser, getAllUsers, getAllProducts, createProduct, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
// import { PRODUCT } from "./types";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
// createUser({id: '03', email: 'beltrano@gmail.com', password: '1234567'})
// getAllUsers()
// createProduct({id: '04', name: 'celular', price: 1399, category: PRODUCT.ELECTRONICS})
// getAllProducts()
// getProductById('04')
// queryProductsByName('CeLular')
// createPurchase({userId: '03', productId: '04', quantity: 2, totalPrice: 2798})
// getAllPurchasesFromUserId('02')
app.get('/ping', (req, res) => {
    res.send('Pong');
});
