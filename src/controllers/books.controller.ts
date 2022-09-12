import * as express from "express"

import BookModel from "../models/book.model"

export class BooksController {

    fetch = (request: express.Request, response: express.Response) => {
        BookModel.find({}, (error: any, books: any) => {
            if(error) {
                response.status(400).json({ "error": "Failed to fetch all books" })
            } else {
                response.status(200).json(books);
            }
        });
    }

    fetchBook = (request: express.Request, response: express.Response) => {
        BookModel.findOne({ isbn: request.params.isbn }, (error: any, book: any) => {
            if(error) {
                response.status(400).json({ "error": "Failed to fetch book" })
            } else {
                response.status(200).json(book);
            }
        });
    }

}