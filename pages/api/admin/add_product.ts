import type { NextApiRequest, NextApiResponse } from 'next'
import { Shop } from "../../../utils/shop";
import { hashedEmail, hashedPassword } from "../../admin/admin.config"
import bcrypt from "bcryptjs"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const shop = new Shop();


export default async (req: NextApiRequest, res: NextApiResponse) => {
    let email;
    let password;
    try {
        console.log(req.cookies)
        email = JSON.parse(req.cookies.credentials).email;
        password = JSON.parse(req.cookies.credentials).password;

    } catch (error) {
        console.log("Cookie not there")
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }

    if (!email || !password) {
        // send an unauthorized status code
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }
    // veryfing email and password
    const adminEmail = hashedEmail;
    const adminPassword = hashedPassword;
    const isPasswordValid = await bcrypt.compare(password, adminPassword);
    const isEmailValid = await bcrypt.compare(email, adminEmail);
    if (!isPasswordValid || !isEmailValid) {
        console.log('Invalid credentials');
        // remove the credentials from the cookies
        res.setHeader('Set-Cookie', 'credentials=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
        // send an unauthorized status code to the client
        res.status(401).json({
            message: 'Invalid credentials'
        });
        return;
    }

    const bodyString = req.body;
    console.log(bodyString)
    req.body = JSON.parse(bodyString);
    const name = req.body.name;
    const price = req.body.price;
    const stock = req.body.stock;
    const image_url = req.body.image_url;
    const author = req.body.author;
    const description = req.body.description;
    console.log(req.body)
    // check if any of the values are missing
    if (!name || !price || !stock || !image_url || !author || !description) {
        // print each missing value
        console.log(name, price, stock, image_url, author, description);
        return res.status(400).send('Missing values');
    }

    res.json({
        "Success": true,
    })
    // convert price into a number
    const price_num = Number(price);

    // convert stock into a number
    const stock_num = Number(stock)

    /*
                STEP: 1
                Add product to stripe
    */


    // First add to stripe
    const product = await stripe.products.create({
        name: name,
        description: description,
        images: [image_url]
    });


    // store the id in a variable
    const product_id = product.id;

    /*
                STEP: 2
                Create price for product
    */
    const price_stripe = await stripe.prices.create({
        unit_amount: price_num * 100,
        currency: 'inr',
        product: product_id
    });

    // store the id in a variable
    const price_id = price_stripe.id;


    /*
                STEP: 3
                Add product to the database with the id of the price
    */
    const product_db = await shop.addProduct(price_id, name, price_num, stock_num, image_url, author, description);



}

