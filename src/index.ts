// import { users, products, purchases } from "./database";
import { TUser, TProduct, TPurchase, PRODUCT } from "./types";
import  express, { Request, Response} from 'express'
import cors from 'cors';
import { db } from './database/knex'



const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})


// get all users
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(
            `SELECT * FROM users;`
        )
        res.status(200).send({Usuários: result})
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// get all products
app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(
            `SELECT * FROM products;`
        )
        res.status(200).send({Produtos: result})
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// get product by name
app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length > 0) {
            const searchedProduct = await db.raw(
                `SELECT * FROM products 
                WHERE name LIKE "%${q}%"`
            )
    
            res.status(200).send(searchedProduct)
        } else {
            res.status(400)
            throw new Error("a busca deve possuir pelo menos um caractere")
        }
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    } 
})

//Create user
app.post('/users', async (req: Request, res: Response) => {
    try {
        const {id, name, email, password, createdAt} = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error ("Tipo de 'id' inválido")
        }
        if (typeof name !== "string") {
            res.status(400)
            throw new Error ("Tipo de 'name' inválido")
        }
        if (typeof email !== "string") {
            res.status(400)
            throw new Error ("Tipo de 'email' inválido")
        }
        if (typeof password !== "string") {
            res.status(400)
            throw new Error ("Tipo de 'password' inválido")
        }
        if (typeof createdAt !== "string") {
            res.status(400)
            throw new Error ("Tipo de 'createdAt' inválido")
        }

        await db.raw(
            `
            INSERT INTO users (id, name, email, password, createdAt)
            VALUES 
                ("${id}", "${name}", "${email}", "${password}", "${createdAt}");
            `
        )
        res.status(201).send(`Usuário ${name} criado com sucesso!`)
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})

// create product
app.post('/products', async (req: Request, res: Response) => {
    try {
        const {id, name, price, category} = req.body
    
        if (typeof id !== "string") {
            res.status(400)
            throw new Error ("Tipo de 'id' inválido")
        }
        if (typeof name !== "string") {
            res.status(400)
            throw new Error ("Tipo de 'name' inválido")
        }
        if (typeof price !== "number") {
            res.status(400)
            throw new Error ("Tipo de 'price' inválido")
        }
        if (typeof category !== "string") {
            res.status(400)
            throw new Error ("Tipo de 'category' inválido")
        }

        await db.raw(
            `
            INSERT INTO products (id, name, price, category)
            VALUES 
                ("${id}", "${name}", "${price}", "${category}");
            `
        )
        res.status(201).send(`Produto ${name} criado com sucesso!`)
    
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
   
})

// get all purchases
app.get("/purchases", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(
            `SELECT * FROM purchases;`
        )
        res.status(200).send({Compras: result})
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// // create purchase
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const {id, total_price, paid, delivered_at, buyer_id} = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error ("Tipo de 'id' inválido")
        }
        if (typeof total_price !== "number") {
            res.status(400)
            throw new Error ("Tipo de 'total_price' inválido")
        }
        if (typeof paid !== "number") {
            res.status(400)
            throw new Error ("Tipo de 'paid' inválido")
        }
        if (typeof delivered_at !== "string") {
            res.status(400)
            throw new Error ("Tipo de 'delivered_at' inválido")
        }
        if (typeof buyer_id !== "string") {
            res.status(400)
            throw new Error ("Tipo de 'buyer_id' inválido")
        }

        await db.raw(
            `
            INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
            VALUES 
                ("${id}", "${total_price}", "${paid}", "${delivered_at}", "${buyer_id}");
            `
        )
        res.status(201).send(`Compra de id ${id} criado com sucesso!`)
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})


// // acha produto por id com path params
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const paramsId = req.params.id

        const result = await db.raw(
            `
            SELECT * FROM products
            WHERE id = "${paramsId}";
            `
        )
        
        res.status(200).send(result)
        
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


// acha as compras realizados pelo usuário correspondente a id com path params
app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        
        const result = await db.raw(
            `
            SELECT * FROM purchases
            WHERE buyer_id = "${id}"
            `
        )
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
})


// // deleta o usuario pela id
// app.delete('/user/:id', (req: Request, res: Response) => {
//     try {
//         const id = req.params.id

//         const indexToRemove = users.findIndex(user => user.id === id)
//         const findIfUserExists = users.find(users => users.id === id)

//         if (!findIfUserExists) {
//             res.status(400)
//             throw new Error("Esse usuário não existe")
//         }

//         if (indexToRemove >= 0) {
//             users.splice(indexToRemove, 1)
//         }

//         res.status(200).send("Conta removida!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
    
// })


// // deleta o produto pela id
// app.delete("/product/:id", (req: Request, res: Response) => {
//     try {
//         const id = req.params.id

//         const indexToRemove = products.findIndex(product => product.id === id)
//         const findIfProductExists = products.find(product => product.id === id)

//         if (!findIfProductExists) {
//             res.status(400)
//             throw new Error("Esse produto não existe")
//         }
//         if (indexToRemove >= 0) {
//             products.splice(indexToRemove, 1)
//         }

//         res.status(200).send("Produto removido!")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
    
// })


// // edita as informações do user por id
// app.put("/user/:id", (req: Request, res: Response) => {
//     try {
//         const paramsId = req.params.id

//         const newId = req.body.id as string | undefined
//         const newEmail = req.body.email as string | undefined
//         const newPassword = req.body.password as string | undefined

//         const selectedUser = users.find(user => user.id === paramsId)

//         if (selectedUser) {
//             if (typeof newId !== "string" && typeof newId !== undefined) {
//                 res.status(400)
//                 throw new Error("Tipo de ID inválido")
//             }
//             if (typeof newEmail !== "string" && typeof newEmail !== undefined) {
//                 res.status(400)
//                 throw new Error("Tipo de email inválido")
//             }
//             if (typeof newPassword !== "string" && typeof newPassword !== undefined) {
//                 res.status(400)
//                 throw new Error("Tipo de senha inválido")
//             }

//             selectedUser.id = newId || selectedUser.id
//             selectedUser.email = newEmail || selectedUser.email
//             selectedUser.password = newPassword || selectedUser.password

//         } 
//         if (!selectedUser) {
//             res.status(400)
//             throw new Error("Esse usuário não existe")
//         }

//         res.status(200).send('Atualização realizada com sucesso')
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
    
// })


// // edita os valores do produto correspondente a id
// app.put('/product/:id', (req: Request, res: Response) => {
//     try {
//         const paramsId = req.params.id

//         const newId = req.body.id as string | undefined
//         const newName = req.body.name as string | undefined
//         const newPrice = req.body.price as number 
//         const newCategory = req.body.category as PRODUCT | undefined

//         const selectedProduct = products.find(p => p.id === paramsId)

//         if (!selectedProduct) {
//             res.status(400)
//             throw new Error("Esse produto não existe")
//         } else if (selectedProduct) {
//             if (typeof newId !== "string" && typeof newId !== undefined) {
//                 res.status(400)
//                 throw new Error("Tipo de ID inválido")
//             }
//             if (typeof newName !== "string" && typeof newName !== undefined) {
//                 res.status(400)
//                 throw new Error("Tipo de nome inválido")
//             }
//             if (newCategory !== "Comida" && newCategory !== "Roupas e calçados" && newCategory !== "Eletrônicos" && typeof newCategory !== undefined) {
//                 res.status(400)
//                 throw new Error("Tipo de categoria inválido")
//             }
//             if (typeof newPrice !== "number" && typeof newPrice !== undefined) {
//                 res.status(400)
//                 throw new Error("Tipo de preço inválido")
//             }
//             selectedProduct.id = newId || selectedProduct.id
//             selectedProduct.name = newName || selectedProduct.name
//             selectedProduct.category = newCategory || selectedProduct.category

//             selectedProduct.price = isNaN(newPrice) ? selectedProduct.price: newPrice

            
//             res.status(200).send("Produto atualizado com sucesso")
//         }
        

//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         res.send(error.message)
//     }
    
// })