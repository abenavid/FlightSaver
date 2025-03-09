/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onCall, HttpsError} from "firebase-functions/v2/https";
import admin from "firebase-admin";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51FGAqMA8lh7Vr2N7lVP2YBZNphcSUKK3wj" +
  "WCvMbq5Jssu8i744gle7mOrDCR47UjBkJ9NTggyq99nauI9rz7cbou00ROLsaEnh");


admin.initializeApp();

exports.createCheckoutSession = onCall(
  {cors: true},
  async () => {
    console.log("Create Checkout Session Called!");
    try {
      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: [{
          price: "price_1R0WgQA8lh7Vr2N7a4cf3WMZ",
          quantity: 1,
        }],
        mode: "subscription",
        phone_number_collection: {
          enabled: true,
        },
        return_url: "https://flightsaver-bffd8.web.app/success.html",
      });
      return {
        status: "success",
        clientSecret: session.client_secret,
        sessionId: session.id,
      };
    } catch (error: any) {
      throw new HttpsError("internal", error.message);
    }
  });
