# simpleStore

This project is a small attempt to create a serverless Stripe store with React and NodeJS.

## Features
* load product data based on SKU from Stripe
* Use the PaymentRequest API if available, otherwise fallback to regular form-based checkout 
* uses Stripe Elements
* AWS Lambda-ready

It was thrown together on a Sunday afternoon as an attempt to create a MVP with not a lot of error handling. Not production-ready or beautiful by any means.


## Checkout Flow

This is the basic start screen
![Basic App](BasicApp.png?raw=true "Start screen")

If the browser supports the PaymentRequest API, this is totally painless. After just one click on the button:
![Basic App](PaymentRequest.png?raw=true "PaymentRequest")

If the browser does not suppor the PaymentRequest API, the user needs to do some work. The form fields follow the autofill specification though, so all modern browsers should fill this with ease. 
![Basic App](CreditCard.png?raw=true "Manual Input")

In any case, the customer will get a nice order confirmation and we get some nice money.
![Basic App](OrderConfirmation.png?raw=true "Success")


## Structure
* `/backend`: AWS Lambda-ready backend using NodeJS and Express
* `/frontend`: Frontend using React and Stripe Elements, can be uploaded to S3 for static hosting



## Setup
* Frontend:
  * `cd frontend`
  * `npm install`
  * Insert your public Stripe API key in `index.js`
  * `npm run start`: Opens local dev server on :3000
  * `npm run build`: Builds the frontend into the /build folder, this can be uploaded to S3
* Backend
  * `cd backend`
  * `npm install`
  * Set the `STRIPE_KEY` environment variable to your private Stripe key
  * `npm run start`: Starts the local dev server
  * Deployment on Lambda: Upload the folder, define `lambda.handler` as the handler


## License
MIT