import type { NextApiRequest, NextApiResponse } from 'next'
import { Shop } from "../../utils/shop";


const shop = new Shop();
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const searchTerm = req.query.term;
    const products = await shop.searchProducts(searchTerm);
    // add cache for 2 minutes
    res.setHeader('Cache-Control', 'max-age=120');
    res.status(200).json(products);
}



export async function getData(term) {
    const products = await shop.searchProducts(term);
    return JSON.parse(JSON.stringify(products));
}