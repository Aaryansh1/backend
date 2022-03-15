const express =  require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51JrNivSAVIHHAkidrC7mYAU6PCaxZrc9pM71yLiQO69kKOEtrr7amcYlBSNOu2qxvCwYnp9PhNiHVIIv7Yz2hiNu00kSyBGQt8');
require("dotenv").config();
// API 

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get('/', (request , response) => response.status(200).send('hello world'));

app.post('/payments/create', async(request, response) => {
    const total = request.query.total;
    console.log('payment Request received = ', total)
  try{  const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency : "inr" ,
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })}
    catch(error) {
        next(error);
      }
})
// Listen command
app.listen(process.env.PORT || 3001,()=>{
    console.log("Server running");
})
