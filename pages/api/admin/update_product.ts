import type { NextApiRequest, NextApiResponse } from 'next'
import { Shop } from "../../../utils/shop"
import { hashedEmail, hashedPassword } from "../../../utils/admin.config"
import bcrypt from "bcryptjs"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


const shop = new Shop()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const _id = req.body._id;
    const change_object = req.body.change_object;

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

    try {
        const product = await shop.editProduct(_id, change_object);
        console.log(_id, change_object)
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json(error);
    }

    const price = await stripe.prices.retrieve(
        _id
    );

    const productId = price.product;
    if (change_object.name && !change_object.description) {
        const product = await stripe.products.update(productId, {
            name: change_object.name
        });
    } else if (!change_object.name && change_object.description) {
        const product = await stripe.products.update(productId, {
            description: change_object.description
        });
    } else if (change_object.name && change_object.description) {
        const product = await stripe.products.update(productId, {
            name: change_object.name,
            description: change_object.description
        });
    } else {
        return;
    }


}