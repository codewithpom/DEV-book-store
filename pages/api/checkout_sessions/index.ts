import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // @ts-ignore
    apiVersion: null,
    typescript: true
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).end();
        return;
    }


    try {
        // create a new Checkout Session for the order

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: req.body.lineItems ?? [],
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cart`
        });

        res.status(200).json(session)
    } catch (e) {
        res.status(500).json({
            statusCode: 500,
            message: e.message
        });
    }




}


