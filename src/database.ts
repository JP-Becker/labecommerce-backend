import { TUser, TProduct, TPurchase, PRODUCT } from "./types"

export const createUser = (user: TUser) => {
    users.push(user)
    console.log('Usuário criado')
}

export const getAllUsers = () => {
    const allUsers = users.map((user) => {
        return user
    })
    console.log(allUsers)
}

export const users: TUser[] = [
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
]

export const createProduct = (product: TProduct) => {
    products.push(product)

    console.log("Produto criado com sucesso")
}

export const getAllProducts = () => {
    const allProducts = products.map((product) => {
        return product
    })
    console.log(allProducts)
}

export const getProductById = (idToSearch: string) => {
    const findProduct = products.find((product) => {
        return product.id === idToSearch
    })
    if (findProduct) {
        return console.log('O produto que vc buscou é o', findProduct.name)
    } else {
        return console.log('Esse produto não existe')
    }
}

export const queryProductsByName = (q: string) => {
    const findProduct = products.find((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    console.log(findProduct)
}

export const products: TProduct[] = [
    {
        id: '031',
        name: 'arroz',
        price: 10,
        category: PRODUCT.FOOD
    },
    {
        id: '042',
        name: 'feijao',
        price: 15,
        category: PRODUCT.FOOD
    }
]

export const createPurchase = (purchase: TPurchase) => {
    purchases.push(purchase)

    console.log("Compra realizada com sucesso")
}

export const getAllPurchasesFromUserId = (userIdToSearch: string) => {
    const findPurchase = purchases.find((p) => {
        return p.userId === userIdToSearch
    })

    console.log(findPurchase)
}

export const purchases: TPurchase[] = [
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
]