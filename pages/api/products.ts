import type { NextApiRequest, NextApiResponse } from 'next'
import { Shop } from "../../utils/shop";


const shop = new Shop();
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const products = await shop.getProducts();
    console.log(products);
    res.status(200).json(products);
}