"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("users");
        res.status(200).send({ Usuários: result });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("products");
        res.status(200).send({ Produtos: result });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get('/products/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q.length > 0) {
            const searchedProduct = yield (0, knex_1.db)("products").where("name", "LIKE", `${q}`);
            res.status(200).send(searchedProduct);
        }
        else {
            res.status(400);
            throw new Error("a busca deve possuir pelo menos um caractere");
        }
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password, createdAt } = req.body;
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("Tipo de 'id' inválido");
        }
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("Tipo de 'name' inválido");
        }
        if (typeof email !== "string") {
            res.status(400);
            throw new Error("Tipo de 'email' inválido");
        }
        if (typeof password !== "string") {
            res.status(400);
            throw new Error("Tipo de 'password' inválido");
        }
        if (typeof createdAt !== "string") {
            res.status(400);
            throw new Error("Tipo de 'createdAt' inválido");
        }
        const newUser = {
            id,
            name,
            email,
            password,
            createdAt
        };
        yield knex_1.db.insert(newUser).into("users");
        res.status(201).send(`Usuário ${name} criado com sucesso!`);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, price, category } = req.body;
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("Tipo de 'id' inválido");
        }
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("Tipo de 'name' inválido");
        }
        if (typeof price !== "number") {
            res.status(400);
            throw new Error("Tipo de 'price' inválido");
        }
        if (typeof category !== "string") {
            res.status(400);
            throw new Error("Tipo de 'category' inválido");
        }
        const newProduct = {
            id,
            name,
            price,
            category
        };
        yield knex_1.db.insert(newProduct).into("products");
        res.status(201).send(`Produto ${name} criado com sucesso!`);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("purchases");
        res.status(200).send({ Compras: result });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.post('/purchases', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, total_price, paid, delivered_at, buyer_id } = req.body;
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("Tipo de 'id' inválido");
        }
        if (typeof total_price !== "number") {
            res.status(400);
            throw new Error("Tipo de 'total_price' inválido");
        }
        if (typeof paid !== "number") {
            res.status(400);
            throw new Error("Tipo de 'paid' inválido");
        }
        if (typeof delivered_at !== "string") {
            res.status(400);
            throw new Error("Tipo de 'delivered_at' inválido");
        }
        if (typeof buyer_id !== "string") {
            res.status(400);
            throw new Error("Tipo de 'buyer_id' inválido");
        }
        const newPurchases = {
            id,
            total_price,
            paid,
            delivered_at,
            buyer_id
        };
        yield knex_1.db.insert(newPurchases).into("purchases");
        res.status(201).send(`Compra de id ${id} criado com sucesso!`);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramsId = req.params.id;
        const result = yield (0, knex_1.db)("products").where({ id: paramsId });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get('/users/:id/purchases', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, knex_1.db)("users").where({ id: id });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchedId = req.params.id;
        const result = yield (0, knex_1.db)("purchases").where({ id: searchedId }).innerJoin("users", "purchases.email", "=", "users.email");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
//# sourceMappingURL=index.js.map