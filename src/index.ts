import { users, products, purchases } from "./database";
import { TUser, TProduct, TPurchase, PRODUCT } from "./types";
import  express, { Request, Response} from 'express'
import cors from 'cors';
import { type } from "os";


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


// get all users
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error: any) {
        res.send(error.message)
    }
})

// get all products
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error: any) {
        res.send(error.message)
    }
})

// get product by name
app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length > 0) {
            const productsFiltered = products.filter((product) => {
                return product.name.toLowerCase().includes(q.toLowerCase())
            })
    
            res.status(200).send(productsFiltered)
        } else {
            res.status(400)
            throw new Error("a busca deve possuir pelo menos um caractere")
        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
    
})

//Create user
app.post('/users', (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password

        const newUser: TUser = {
            id: id,
            email: email,
            password: password
        }
        const findRepeatedId = users.find(user => user.id === id)
        const findRepeatedEmail = users.find(user => user.email === email)

        if (findRepeatedId) {
            res.status(400)
            throw new Error("Essa ID já está em uso")
        }
        if (findRepeatedEmail) {
            res.status(400)
            throw new Error("Esse e-mail já está em uso")
        }
        
        users.push(newUser)

        res.status(201).send("Usuário criado com sucesso!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
    
})

// create product
app.post('/products', (req: Request, res: Response) => {
    try {
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
        const findRepeatedId = products.find(product => product.id === id)

        if (findRepeatedId) {
            res.status(400)
            throw new Error("Essa ID já está em uso")
        }
    
        products.push(newProduct)
    
        res.status(201).send("Produto cadastrado com sucesso!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
   
})

// get all purchases
app.get("/purchases", (req: Request, res: Response) => {
    try {
        res.status(200).send(purchases)
    } catch (error: any) {
        res.send(error.message)
    }
})

// create purchase
app.post('/purchases', (req: Request, res: Response) => {
    try {
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
        const findUserId = users.find(user => user.id === userId)
        const findProductId = products.find(product => product.id === productId)

        if (!findUserId) {
            res.status(400)
            throw new Error("Essa ID nao existe na lista de usuários")
        }
        if (!findProductId) {
            res.status(400)
            throw new Error("A ID desse produto nao existe na lista de produtos")
        } if (totalPrice !== findProductId.price * quantity) {
            res.status(400)
            throw new Error("O valor total está incorreto")
        }

        purchases.push(newPurchase)

        res.status(201).send("Compra realizada com sucesso!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
    
})


// acha produto por id com path params
app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const selectedProduct = products.find(p => p.id === id)

        if (!selectedProduct) {
            res.status(400)
            throw new Error("Esse produto não existe")
        }

        res.status(200).send(selectedProduct)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})


// acha as compras realizados pelo usuário correspondente a id com path params
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userPurchases = purchases.find(p => p.userId === id)

        if (!userPurchases) {
            res.status(400)
            throw new Error("Essa compra não existe")
        }

        res.status(200).send(userPurchases)
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
    
})


// deleta o usuario pela id
app.delete('/user/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const indexToRemove = users.findIndex(user => user.id === id)
        const findIfUserExists = users.find(users => users.id === id)

        if (!findIfUserExists) {
            res.status(400)
            throw new Error("Esse usuário não existe")
        }

        if (indexToRemove >= 0) {
            users.splice(indexToRemove, 1)
        }

        res.status(200).send("Conta removida!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
    
})


// deleta o produto pela id
app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const indexToRemove = products.findIndex(product => product.id === id)
        const findIfProductExists = products.find(product => product.id === id)

        if (!findIfProductExists) {
            res.status(400)
            throw new Error("Esse produto não existe")
        }
        if (indexToRemove >= 0) {
            products.splice(indexToRemove, 1)
        }

        res.status(200).send("Produto removido!")
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
    
})


// edita as informações do user por id
app.put("/user/:id", (req: Request, res: Response) => {
    try {
        const paramsId = req.params.id

        const newId = req.body.id as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const selectedUser = users.find(user => user.id === paramsId)

        if (selectedUser) {
            if (typeof newId !== "string" && typeof newId !== undefined) {
                res.status(400)
                throw new Error("Tipo de ID inválido")
            }
            if (typeof newEmail !== "string" && typeof newEmail !== undefined) {
                res.status(400)
                throw new Error("Tipo de email inválido")
            }
            if (typeof newPassword !== "string" && typeof newPassword !== undefined) {
                res.status(400)
                throw new Error("Tipo de senha inválido")
            }

            selectedUser.id = newId || selectedUser.id
            selectedUser.email = newEmail || selectedUser.email
            selectedUser.password = newPassword || selectedUser.password

        } 
        if (!selectedUser) {
            res.status(400)
            throw new Error("Esse usuário não existe")
        }

        res.status(200).send('Atualização realizada com sucesso')
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
    
})


// edita os valores do produto correspondente a id
app.put('/product/:id', (req: Request, res: Response) => {
    try {
        const paramsId = req.params.id

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number 
        const newCategory = req.body.category as PRODUCT | undefined

        const selectedProduct = products.find(p => p.id === paramsId)

        if (!selectedProduct) {
            res.status(400)
            throw new Error("Esse produto não existe")
        } else if (selectedProduct) {
            if (typeof newId !== "string" && typeof newId !== undefined) {
                res.status(400)
                throw new Error("Tipo de ID inválido")
            }
            if (typeof newName !== "string" && typeof newName !== undefined) {
                res.status(400)
                throw new Error("Tipo de nome inválido")
            }
            if (newCategory !== "Comida" && newCategory !== "Roupas e calçados" && newCategory !== "Eletrônicos" && typeof newCategory !== undefined) {
                res.status(400)
                throw new Error("Tipo de categoria inválido")
            }
            if (typeof newPrice !== "number" && typeof newPrice !== undefined) {
                res.status(400)
                throw new Error("Tipo de preço inválido")
            }
            selectedProduct.id = newId || selectedProduct.id
            selectedProduct.name = newName || selectedProduct.name
            selectedProduct.category = newCategory || selectedProduct.category

            selectedProduct.price = isNaN(newPrice) ? selectedProduct.price: newPrice

            
            res.status(200).send("Produto atualizado com sucesso")
        }
        

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
    
})