import express from "express";

import { BooksController } from "../controllers/books.controller";

const BooksRouter = express.Router();

BooksRouter.route("/").get(
    (request, response) => new BooksController().fetch(request, response)
);

BooksRouter.route("/modify").post(
    (request, response) => new BooksController().modify(request, response)
);

BooksRouter.route("/recommended").get(
    (request, response) => new BooksController().recommended(request, response)
);

BooksRouter.route("/register").post(
    (request, response) => new BooksController().register(request, response)
);

BooksRouter.route("/popular").get(
    (request, response) => new BooksController().popular(request, response)
);

BooksRouter.route("/requests").get(
    (request, response) => new BooksController().requests(request, response)
);

BooksRouter.route("/requests/approve").post(
    (request, response) => new BooksController().approve(request, response)
);

BooksRouter.route("/requests/delete").post(
    (request, response) => new BooksController().delete(request, response)
);

BooksRouter.route("/:id").get(
    (request, response) => new BooksController().fetchBook(request, response)
);

export default BooksRouter;