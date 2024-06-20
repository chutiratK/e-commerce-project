import express, { Request, Response } from "express";
import cors from "cors";
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

app.post("/coupon", async (req: Request, res: Response) => {
  try {
    const { coupon } = req.body;
    const couponData = await stripe.coupons.retrieve(coupon);

    res.status(200).send({
      coupon: couponData
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/create-coupon", async (req: Request, res: Response) => {
  try {
    const { duration, percentOff } = req.body;
    const coupon = await stripe.coupons.create({
      duration: 'repeating',
      duration_in_months: duration,
      percent_off: percentOff,
    });

    res.status(200).send({
      coupon: coupon
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// app.post("/update-coupon", async (req: Request, res: Response) => {
//   try {
//     const { couponID, duration, percentOff } = req.body;
//     const coupon = await stripe.coupons.update(couponID,
//       {
//         duration_in_months: duration,
//         percent_off: percentOff,
//       }
//     );

//     res.status(200).send({
    
//     });

//   } catch(error) {
//     res.status(500).json({ error: error });
//   }
// });

app.get("/coupon-list", async (req: Request, res: Response) => {
  try {
    const coupons = await stripe.coupons.list({
      limit: 3,
    });

    res.status(200).send({
      couponList: coupons.data
    });

  } catch(error) {
    res.status(500).json({ error: error });
  }
});


app.post("/delete-coupon", async (req: Request, res: Response) => {
  try {
    const { couponID } = req.body;
    const deleted = await stripe.coupons.del(couponID);

    res.status(200).send({
      status: deleted.deleted
    });

  } catch(error) {
    res.status(500).json({ error: error });
  }
});

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Server is running...");
});
export default { path: "/api/v1", handler: app };