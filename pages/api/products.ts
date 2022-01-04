import type { NextApiRequest, NextApiResponse } from 'next'
import { Shop } from "../../utils/shop";

type Book = {
    _id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    author: string;
    description: string;
}

type Data = Book[]

const shop = new Shop();
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const products = await shop.getProducts();
    console.log(products);
    res.status(200).json(products);
}


export async function getProducts(): Promise<Data> {
    const products = await shop.getProducts() as unknown as Data;
    return JSON.parse(JSON.stringify(products));
}