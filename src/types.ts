export type TUser = {
    id: string
    name: string
    email: string
    password: string
    created_at: string
}

export type TProduct = {
    id: string
    name: string
    price: number
    category: PRODUCT
    image_url: string
}

export enum PRODUCT {
    FOOD = "Comida",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}

export type TPurchase = {
    id: string
    buyer: string
    total_price: number
    createad_at: string
    paid: number
}

export type TPurchaseProduct = {
    purchase_id: string
    product_id: string
    quantity: number
}