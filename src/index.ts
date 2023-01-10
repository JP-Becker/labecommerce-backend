import { users, products, purchases } from "./database";
import { TUser, TProduct, TPurchase, PRODUCT } from "./types";
import  express, { Request, Response} from 'express'
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


// get all users
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

// get all products
app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

// get product by name
app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const productsFiltered = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })

    res.status(200).send(productsFiltered)
})

//Create user
app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    const newUser: TUser = {
        id: id,
        email: email,
        password: password
    }

    users.push(newUser)

    res.status(201).send("Usuário criado com sucesso!")
})

// create product
app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }

    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso!")
})

// get all purchases
app.get("/purchases", (req: Request, res: Response) => {
    res.status(200).send(purchases)
})

// create purchase
app.post('/purchases', (req: Request, res: Response) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase: TPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    }

    purchases.push(newPurchase)

    res.status(201).send("Compra realizada com sucesso!")
})


// acha produto por id com path params
app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const selectedProduct = products.find(p => p.id === id)

    res.status(200).send(selectedProduct)
})


// acha as compras realizados pelo usuário correspondente a id com path params
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id

    const userPurchases = purchases.find(p => p.userId === id)

    res.status(200).send(userPurchases)
})


// deleta o usuario pela id
app.delete('/user/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = users.findIndex(user => user.id === id)

    if (indexToRemove >= 0) {
        users.splice(indexToRemove, 1)
    }

    res.status(200).send("Conta removida!")
})


// deleta o produto pela id
app.delete("/product/:id", (req: Request, res: Response) => {
    const id = req.params.id

    const indexToRemove = products.findIndex(product => product.id === id)

    if (indexToRemove >= 0) {
        products.splice(indexToRemove, 1)
    }

    res.status(200).send("Produto removido!")
})


// edita as informações do user por id
app.put("/user/:id", (req: Request, res: Response) => {
    const paramsId = req.params.id

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const selectedUser = users.find(user => user.id === paramsId)

    if (selectedUser) {

        selectedUser.id = newId || selectedUser.id
        selectedUser.email = newEmail || selectedUser.email
        selectedUser.password = newPassword || selectedUser.password

    }

    res.status(200).send('Atualização realizada com sucesso')
})


// edita os valores do produto correspondente a id
app.put('/product/:id', (req: Request, res: Response) => {
    const paramsId = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number 
    const newCategory = req.body.category as PRODUCT | undefined

    const selectedProduct = products.find(p => p.id === paramsId)

    if (selectedProduct) {
        selectedProduct.id = newId || selectedProduct.id
        selectedProduct.name = newName || selectedProduct.name
        selectedProduct.category = newCategory || selectedProduct.category
        selectedProduct.price = isNaN(newPrice) ? selectedProduct.price: newPrice
    }

    res.status(200).send("Produto atualizado com sucesso")
})