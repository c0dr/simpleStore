var express = require('express');
var app = express();
var stripe = require('stripe')(process.env.STRIPE_KEY);
var cors = require('cors')
var bodyParser = require('body-parser')

//TODO: Filter CORS domains
app.use(cors());
app.use(bodyParser.json());

app.get('/product/:sku', async (req, res) => {
  try {
    let sku = await stripe.skus.retrieve(req.params.sku);
    let product = await stripe.products.retrieve(sku.product);
    //TODO: Filter properties
    return res.json({ sku: sku, product: product });
  } catch (err) {
    return res.status(500).send('an error occurred');
  }
});

app.post('/order', async function (req, res) {
  let product = req.body.sku;
  let customer = req.body.customer;
  let token = req.body.token;

  if (!product || !customer || !token) {
    res.status(500).send('Not all required fields sent');
  }
  //TODO: Add better validation

  try {
    let order = await stripe.orders.create({
      currency: 'eur',
      items: [
        {
          type: 'sku',
          parent: product,
        }
      ],
      shipping: {
        name: customer.name,
        address: {
          line1: customer.address_line1,
          city: customer.address_city,
          postal_code: customer.address_zip
        }
      },
      email: customer.email,
    });

    await stripe.orders.pay(order.id, { source: token.id });
    return res.status(200).send('successful');
  } catch (err) {
    console.log(err);
    return res.status(500).send('an error occurred');
  }
});


module.exports = app;