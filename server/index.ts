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
    const { amount, token } = req.body;
    if (isNaN(amount)) {
      res.status(400).json({ error: "Invalid amount provided" });
      return;
    }
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: token,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "thb",
      payment_method_types: ["card"],
      payment_method: paymentMethod.id,
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

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Server is running...");
});
export default { path: "/api/v1", handler: app };
// const endpointSecret = "whsec_aqxxQQZkXJGb5ANrW48vPQJq2QEfJHA7";

// app.use(bodyParser.raw({ type: "application/json" }));

// app.post("/webhook", (req, res) => {
//   const sig = req.headers["stripe-signature"];

//   let event;

//   try {
//     // สร้าง event จาก payload ที่ส่งมาจาก Stripe
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.error("Webhook Error:", err);
//     return res.status(400).send(`Webhook Error: ${err}`);
//   }

//   // จัดการ event ต่างๆ ตามที่คุณต้องการ
//   if (event.type === "payment_intent.succeeded") {
//     const paymentIntent = event.data.object;
//     console.log("PaymentIntent was successful!");
//   } else if (event.type === "payment_intent.payment_failed") {
//     const paymentIntent = event.data.object;
//     console.error("PaymentIntent failed:", paymentIntent.last_payment_error);
//   }

//   // ส่งคำตอบกลับไปยัง Stripe เพื่อยืนยันการรับ event เรียบร้อยแล้ว
//   res.status(200).json({ received: true });
// });
