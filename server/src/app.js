import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import Env from "./utils/constants/Env.js";
import userRoute from "./routes/users/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.json());
app.use(cors());

// Server Routes
app.use("/users", userRoute);

// MongoDB database configuration
mongoose
  .connect(Env.MongoDB_URL)
  .then(async () => {
    app.listen(Env.PORT, (result) => {
      console.log(
        `Successfully connect to Database with Server Port ${Env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.warn("Fail to connect to Database: ", err);
  });
