import { buffer } from "micro";
import * as admin from "firebase-admin";

//securing connection to firebase from backend
const serviceAccount = require("../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Establishing connection to stripe

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNIN_SECRET;

const completeOrder = async (session) => {
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been placed...`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    //verifying that event posted is from stripe
    try {
      event = stripe.webhooks.contructEvent(payload, sig, endpointSecret);
    } catch (error) {
      return res.status(400).send(`Webhook error : ${error.message}`);
    }

    //handle the event when checkout completes
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // complete the order of the customer
      return completeOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`webhook error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
