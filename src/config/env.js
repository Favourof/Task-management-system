import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT,
  mongodbUrl: process.env.MONGO_URI,
  jwtSecrect: process.env.JWT_SECRET,
  apiKey: process.env.API_KEY,
  apiSecretKey: process.env.API_SECRECT_KEY,
  apiPublicKey: process.env.API_PUPLIC_KEY,
  callbackUrl: process.env.CALLBACK_URL,
};
