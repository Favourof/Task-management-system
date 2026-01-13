import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoute from "./routes/user.js";
import taskRoute from "./routes/task.js";
import paymentRoute from "./routes/payment.js";
import aiRoute from "./routes/ai.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/auth", authRoute);
app.use("/task", taskRoute);
app.use("/payment", paymentRoute);
app.use("/ai", aiRoute);

app.get("/", (req, res) => {
  res.send("Task Management is runing fine");
});

export default app;
