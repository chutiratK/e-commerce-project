const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51OPNLwFJUwe1va09f52NR33CExT8eu4n6l7AFS4iWWC8GtgpJNYD7ehhnIW5wPSKMRCRezzgDJsceeZK2mldW6CE00eiP3nHrq');

const app = express();
app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
    const token = req.body.token;
    const amount = 10;

    try {
        const charge = await stripe.charges.create({
            amount,
            currency: 'thb',
            source: token,
        });

        // ทำสิ่งที่คุณต้องการหลังจากการชำระเงินเสร็จสมบูรณ์
        console.log(charge);
        res.status(200).send('Payment successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Payment failed');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// const Stripe = require("Stripe");
// const express = require("express");
// const stripe = new Stripe('sk_test_51OPNLwFJUwe1va09f52NR33CExT8eu4n6l7AFS4iWWC8GtgpJNYD7ehhnIW5wPSKMRCRezzgDJsceeZK2mldW6CE00eiP3nHrq');

// const app = express();

// app.use(express.static("public"));
// app.use(express.json());

// // const calculateOrderAmount = (items) => {
// //   return 24 * 100;
// // };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items, totalAmount  } = req.body;
  
//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: totalAmount * 100,
//     currency: "thb",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// app.listen(4242, () => console.log("Node server listening on port 4242!"));


// const stripe = require('stripe')('sk_test_51OPNLwFJUwe1va09f52NR33CExT8eu4n6l7AFS4iWWC8GtgpJNYD7ehhnIW5wPSKMRCRezzgDJsceeZK2mldW6CE00eiP3nHrq');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:3001';

// app.post('/create-checkout-session', async (req, res) => {
//     const { userID, orderID, totalAmount } = req.body;
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//         {
//             price: 'price_1OUwbYFJUwe1va094z3E6lVZ',
//             quantity: 1,
//         },
//         ],
//         mode: 'payment',
//         success_url: `${YOUR_DOMAIN}`,
//         cancel_url: `${YOUR_DOMAIN}`,
//     });

//     res.redirect(303, session.url);
// });

// app.listen(3001, () => console.log('Running on port 3001'));


// import express, { Request, Response } from 'express';
// import { Stripe } from 'stripe';

// const cors = require('cors');
// require('dotenv').config()

// const endpointSecret = "whsec_d93b4772f760517579b522be64b74046af6bbf76f6ce151e7e841c4ee93b27e4";
// const stripeSecretKey = 'sk_test_51OPNLwFJUwe1va09f52NR33CExT8eu4n6l7AFS4iWWC8GtgpJNYD7ehhnIW5wPSKMRCRezzgDJsceeZK2mldW6CE00eiP3nHrq';
// const stripe = new Stripe(stripeSecretKey, {
//   apiVersion: '2023-10-16',
// });

// const app = express();
// app.use(express.static('public'));
// app.use(cors());
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
//   };
// app.use(cors(corsOptions));
// const YOUR_DOMAIN = 'http://localhost:3000';

// app.post('/create-checkout-session', async (req: Request, res: Response) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//             {
//             price_data: {
//                 currency: 'thb',
//                 // product_data: {
//                 //     name: product.name,
//                 // },
//                 // unit_amount: CSSMathProduct.price * 100,
//             },
//             quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${YOUR_DOMAIN}`,
//       cancel_url: `${YOUR_DOMAIN}`,
//     });
//     console.log('Created checkout session:', session);
//     res.redirect(303, session.url as string);

//   } catch (error) {
//     console.error('Error creating checkout session:', error); 
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(3000, () => console.log('Running on port 3000'));
