"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.getAllPurchasesFromUserId = exports.createPurchase = exports.products = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.users = exports.getAllUsers = exports.createUser = void 0;
const types_1 = require("./types");
const createUser = (user) => {
    exports.users.push(user);
    console.log('Usuário criado');
};
exports.createUser = createUser;
const getAllUsers = () => {
    const allUsers = exports.users.map((user) => {
        return user;
    });
    console.log(allUsers);
};
exports.getAllUsers = getAllUsers;
exports.users = [
    {
        id: '01',
        email: 'fulano@gmail.com',
        password: '12345',
    },
    {
        id: '02',
        email: 'fulana@gmail.com',
        password: '123456',
    }
];
const createProduct = (product) => {
    exports.products.push(product);
    console.log("Produto criado com sucesso");
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    const allProducts = exports.products.map((product) => {
        return product;
    });
    console.log(allProducts);
};
exports.getAllProducts = getAllProducts;
const getProductById = (idToSearch) => {
    const findProduct = exports.products.find((product) => {
        return product.id === idToSearch;
    });
    if (findProduct) {
        return console.log('O produto que vc buscou é o', findProduct.name);
    }
    else {
        return console.log('Esse produto não existe');
    }
};
exports.getProductById = getProductById;
const queryProductsByName = (q) => {
    const findProduct = exports.products.find((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase());
    });
    console.log(findProduct);
};
exports.queryProductsByName = queryProductsByName;
exports.products = [
    {
        id: '031',
        name: 'arroz',
        price: 10,
        category: types_1.PRODUCT.FOOD
    },
    {
        id: '042',
        name: 'feijao',
        price: 15,
        category: types_1.PRODUCT.FOOD
    }
];
const createPurchase = (purchase) => {
    exports.purchases.push(purchase);
    console.log("Compra realizada com sucesso");
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    const findPurchase = exports.purchases.find((p) => {
        return p.userId === userIdToSearch;
    });
    console.log(findPurchase);
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
exports.purchases = [
    {
        userId: '01',
        productId: '031',
        quantity: 3,
        totalPrice: 30
    },
    {
        userId: '02',
        productId: '042',
        quantity: 2,
        totalPrice: 30
    }
];
