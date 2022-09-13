import express from "express";

import { BooksController } from "../controllers/books.controller";

const BooksRouter = express.Router();

BooksRouter.route("/").get(
    (request, response) => new BooksController().fetch(request, response)
);

BooksRouter.route("/:id").get(
    (request, response) => new BooksController().fetchBook(request, response)
);

export default BooksRouter;