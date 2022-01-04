import type { NextApiRequest, NextApiResponse } from 'next'
import { Shop } from "../../utils/shop";


const shop = new Shop();


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const productId = req.query.id;
    const products = await shop.getProduct(productId);
    console.log(products);
    if (products) {
        res.status(200).json(products);
    } else {
        res.status(404).json({
            message: 'Product not found'
        });
    }

}

export async function getProduct(id) {
    const product = await shop.getProduct(id);
    return JSON.parse(JSON.stringify(product));
}
