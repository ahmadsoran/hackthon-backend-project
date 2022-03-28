import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./src/routes/userRouter/authRoute.js";
import apointmentRoute from "./src/routes/apointmentRoute.js";

dotenv.config("dotenv");

let ENV = process.env;

const app = express();
app.get("/", (req, res) => {
  res.send("hello");
});
app.use(cors());

DBconnection();
async function DBconnection() {
  mongoose.Promise = global.Promise;

  await mongoose
    .connect(ENV.DATABASE_URL, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err.message + "connection faild");
    });
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoute);
app.use(apointmentRoute);
app.listen(ENV.PORT, () => {
  console.log("server online" + ENV.PORT);
});




export default app


