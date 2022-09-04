import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import UserRouter from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/library");

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Connected to Mongo DataBase...");
});

const router = express.Router();

router.route("/").get((request, response) => {
    response.send("Hello Wordl!");
});

router.use("/users", UserRouter)

app.use("/", router);

app.listen(4000, () => {
    console.log("Express server running on port 4000...");
});