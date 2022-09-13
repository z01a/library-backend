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
        BookModel.findOne({ isbn: request.params.id }, (error: any, book: any) => {
            if(error) {
                response.status(400).json({ "error": "Failed to fetch book" })
            } else {
                response.status(200).json(book);
            }
        });
    }

    modify = (request: express.Request, response: express.Response) => {
        const isbn = request.body.isbn;
        const title = request.body.title;
        const publisher = request.body.publisher;
        const published = request.body.published;
        const language = request.body.language;
        const genres = request.body.genres;

        BookModel.collection.updateOne({ isbn: isbn}, {$set: {
            "title": title,
            "publisher": publisher,
            "published": published,
            "language": language
        }}).then(result => {
            response.status(200).json({ "message": "Book modified!" })
        }).catch(error => {
            response.status(400).json({ "error": "Failed to modify book" })
        });
    }

}