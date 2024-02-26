import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51OPNLwFJUwe1va09f52NR33CExT8eu4n6l7AFS4iWWC8GtgpJNYD7ehhnIW5wPSKMRCRezzgDJsceeZK2mldW6CE00eiP3nHrq",
  {
    apiVersion: "2023-10-16",
    typescript: true,
  }
);

const app = express();

app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req: Request, res: Response) => {
  try {
    const { amount, payment } = req.body;
    if (isNaN(amount)) {
      res.status(400).json({ error: "Invalid amount provided" });
      return;
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "thb",
      payment_method_types: ["card"],
      payment_method: payment.id,
      confirmation_method: "manual",
      confirm: true,
    });
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const stripe = require("stripe")(
//   "sk_test_51OPNLwFJUwe1va09f52NR33CExT8eu4n6l7AFS4iWWC8GtgpJNYD7ehhnIW5wPSKMRCRezzgDJsceeZK2mldW6CE00eiP3nHrq"
// );

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { amount, payment } = req.body;
//     if (isNaN(amount)) {
//       res.status(400).json({ error: "Invalid amount provided" });
//       return;
//     }
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100,
//       currency: "thb",
//       payment_method_types: ["card"],
//       payment_method_data: {
//         type: "card",
//         card: {
//           token: payment.id,
//         },
//       },
//       confirmation_method: "manual",
//       confirm: true,
//     });
//     res.status(200).send({
//       clientSecret: paymentIntent.client_secret,
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });

// const endpointSecret = "whsec_8Gd8RTuxXEKfiaZ96Ec3bZPl1uJ12VGV";

// app.post(
//   "/webhook",
//   bodyParser.raw({ type: "application/json" }),
//   (req, res) => {
//     const sig = req.headers["stripe-signature"];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//     } catch (err) {
//       console.error("Webhook Error:", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the event
//     if (event.type === "payment_intent.succeeded") {
//       const paymentIntent = event.data.object;
//       console.log("PaymentIntent was successful!");
//       // res.redirect("http://localhost:3000/success");
//     } else if (event.type === "payment_intent.payment_failed") {
//       const paymentIntent = event.data.object;
//       console.error("PaymentIntent failed:", paymentIntent.last_payment_error);
//       // Handle payment failure
//     }

//     res.status(200).json({ received: true });
//   }
// );
// const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
