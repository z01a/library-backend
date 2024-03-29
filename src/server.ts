import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import AuthRouter from "./routers/auth.router";
import UsersRouter from "./routers/users.router";
import BooksRouter from "./routers/books.router";
import ReadingRouter from "./routers/reading.router";
import HistoryRouter from "./routers/history.router";
import ConfigRouter from "./routers/config.router";

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

router.use("/authenticate", AuthRouter)
router.use("/users", UsersRouter)
router.use("/books", BooksRouter)
router.use("/reading", ReadingRouter)
router.use("/history", HistoryRouter)
router.use("/config", ConfigRouter)

app.use("/", router);

app.listen(4000, () => {
    console.log("Express server running on port 4000...");
});