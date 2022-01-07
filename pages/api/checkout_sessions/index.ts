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
            success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cart`,
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'inr',
                        },
                        display_name: 'Free shipping',
                        // Delivers between 5-7 business days
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        }
                    }
                },

            ],
            shipping_address_collection: {
                allowed_countries: ['IN'],
            },
            phone_number_collection: {
                enabled: true
            }

        });

        res.status(200).json(session)
    } catch (e) {
        res.status(500).json({
            statusCode: 500,
            message: e.message
        });
    }




}


