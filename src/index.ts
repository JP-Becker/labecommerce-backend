import { users, products, purchases } from "./database";
import { TUser, TProduct, TPurchase } from "./types";
import  express, { Request, Response} from 'express'
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

// teste
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong')
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

