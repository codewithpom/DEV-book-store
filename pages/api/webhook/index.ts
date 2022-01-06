import Stripe from 'stripe';
import { buffer } from 'micro';
const nodemailer = require("nodemailer")
const MongoClient = require("mongodb").MongoClient;
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const senderMail = process.env.SENDING_EMAIL_ADDRESS;

// declare client
const client = new MongoClient(process.env.DB_CONNECTION_STRING);
// connect to database
const promise = client.connect()





const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: null,
  typescript: true
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let event;

    try {
      // 1. Retrieve the event by verifying the signature using the raw body and secret
      const rawBody = await buffer(req);
      const signature = req.headers['stripe-signature'];

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event
    console.log('✅ Success:', event.id);

    // 2. Handle event type (add business logic here)
    if (event.type === 'checkout.session.completed') {
      const emailTransporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
          user: senderMail,
          pass: process.env.SENDING_EMAIL_PASSWORD
        },
        logger: true
      });
      console.log(event.data)
      const address = event.data.object.shipping.address;
      const email = event.data.object.customer_details.email;
      const phoneNumber = event.data.object.customer_details.phone;
      const name = event.data.object.shipping.name;
      let htmlMessage;
      if (address.line2) {
        htmlMessage =
          `
Hey ${name.split(" ")[0]},
We just recieved your order you will be notified once any of us verifies your request
<br>
<br>
Your Address:
    City: <b> ${address.city} </b>
    <br>
    Country: <b> ${address.country} </b>
    <br>
    Address Line 1: <b> ${address.line1} </b> 
    <br>
    Address Line 2: <b> ${address.line2} </b>

<br>
<br>
With Regards and Thanks
<br>
The DEV Bot
`
      } else {
        htmlMessage =
          `
Hey ${name.split(" ")[0]},
We just recieved your order you will be notified once any of us verifies your request
<br>
<br>
Your Address:
    City: <b> ${address.city} </b>
    <br>
    Country: <b> ${address.country} </b>
    <br>
    Address Line 1: <b> ${address.line1} </b>

<br>
<br>
With Regards and Thanks
<br>
The DEV Bot
`
      }



      const mailOptions = {
        from: senderMail, // sender address
        to: email, // list of receivers
        subject: 'Order Confirmed', // Subject line
        html: htmlMessage// plain text body
      };
      // 3. Return a response to acknowledge receipt of the event.
      res.json({ received: true });
      console.log(htmlMessage)
      console.log("Started wating for email")
      await sleep(5000);
      console.log("Wait completed")
      emailTransporter.sendMail(mailOptions, function (err, info) {
        if (err)
          console.log(err)
        else
          console.log(info);
      });

      stripe.checkout.sessions.listLineItems(
        event.data.object.id,
        // @ts-ignore
        async function (err, lineItems) {
          console.clear()
          // asynchronously called
          // @ts-ignore
          for (item of lineItems.data) {
            // @ts-ignore
            console.log(item.price.id)
            const db = client.db("shop");
            const collection = db.collection("products");
            const productDetails = collection.find(
              {
                // @ts-ignore
                _id: item.price.id
              }
            )

            productDetails.toArray().then(function (productDetails) {
              const quantity = productDetails[0].stock;
              console.log(`Quantity: ${quantity}`)
              collection.updateOne(
                {
                  // @ts-ignore
                  _id: item.price.id
                },
                {
                  $set: {
                    // @ts-ignore
                    "stock": quantity - item.quantity,
                  },

                }
              )
            })


          }
        }
      );

      console.log(`💰  Payment received!`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }


  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}