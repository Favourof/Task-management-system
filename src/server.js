import app from "./app.js";
import connectDB from "./config/db.js";
import { env } from "./config/env.js";

connectDB();

app.listen(env.port, () => {
  console.log(`app is runing on port ${env.port}`);
});
