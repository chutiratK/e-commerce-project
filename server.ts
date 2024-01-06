// const stripe = require('stripe')('sk_test_51OPNLwFJUwe1va09f52NR33CExT8eu4n6l7AFS4iWWC8GtgpJNYD7ehhnIW5wPSKMRCRezzgDJsceeZK2mldW6CE00eiP3nHrq');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:3000';

// app.post('/create-checkout-session', async (req:any, res:any) => {
//     try {
//         const orderID = req.params.orderID;
//         const session = await stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                 price: 'price_1OTUWgFJUwe1va09zOKo0zLi',
//                 quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             success_url: `${YOUR_DOMAIN}`,
//             cancel_url: `${YOUR_DOMAIN}`,
//         });
    
//         res.json({ url: session.url });
//     } catch (error) {
//     console.error('Error creating checkout session:', error.message);
//     res.status(500).send('Internal Server Error');
//     }
// });

// app.listen(3000, () => console.log('Running on port 3000'));