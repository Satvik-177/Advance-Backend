// app.js
import express from "express";
import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

// error middleware always last
app.use(errorHandler);

export default app;