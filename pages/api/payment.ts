import { NextApiRequest, NextApiResponse } from "next"
import {Stripe} from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27"
});
export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
  try {
    const {amount} = req.body;
    console.log('1')
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });
    console.log(paymentIntent)
    
    return res.status(200).json({paymentIntent, amount})

  } catch (error) {
    console.log({error});
    
    return res.status(500).json({ statusCode: 500, message: error})
  }
}