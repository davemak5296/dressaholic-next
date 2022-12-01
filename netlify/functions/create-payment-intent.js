// require('dotenv').config();

const stripe = require('stripe')(
  'sk_test_51LIxMiB263Z3T3svU39Adlabf3hToMEmPFIDYJ8cpeceQoPnGSemDa7yu93yQHpj8lWyxX1p03nGGOobxWTNB4JI00gtEcBvMm'
);
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// (async() => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 123,
//     currency: 'usd',
//     payment_method_types: ['card'],
//   });
//   console.log(JSON.stringify(paymentIntent));
// })();

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);
    // const amount = JSON.parse(event.body).amount;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    console.log(paymentIntent);

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent, amount }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
