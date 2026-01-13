import axios from "axios";
import { env } from "../config/env.js";
import User from "../model/user.js";

export const initializePayment = async (req, res) => {
  const { amount, email } = req.body;
  try {
    const koboAmount = Number(amount) * 100;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        amount: koboAmount,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${env.apiSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Send only the data returned by Paystack
    res.json(response.data.data);
  } catch (error) {
    console.error(error);

    if (error.response) {
      // Paystack responded with an error
      res.status(error.response.status).json(error.response.data);
    } else {
      // Network or other error
      res.status(500).json({ error: error.message });
    }
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.query;

    console.log(reference);

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${env.apiSecretKey}`,
        },
      }
    );

    if (response.data.status === true) {
      const userId = req.user.id;

      await User.findByIdAndUpdate(userId, {
        isPremium: true,
      });

      return res.json({ message: "Payment verified, premium activated" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};
