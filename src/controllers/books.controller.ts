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

    register = (request: express.Request, response: express.Response) => {
        let book = new BookModel(
            {
                isbn: request.body.isbn,
                title: request.body.title,
                publisher: request.body.publisher,
                published: request.body.published,
                language: request.body.language,
                cover: "https://images.isbndb.com/covers/65/07/9788650526507.jpg",
                authors: request.body.authors,
                genres: request.body.genres,
                active: false
            })

        // TODO: Check if user already exist or maybe we can do in database model?

        book.save().then(book => {
            response.status(200).json({ "message": "Book added" })
        }).catch(error => {
            response.status(400).json({ "error": "Failed to register book" })
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

    requests = (request: express.Request, response: express.Response) => {
        BookModel.find({ active: false }, (error: any, books: any) => {
            if(error) {
                response.status(400).json({ "error": "Failed to fetch books" })
            } else {
                response.status(200).json(books);
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

    approve = (request: express.Request, response: express.Response) => {
        const isbn = request.body.isbn;
        console.log(isbn)

        BookModel.collection.updateOne({ isbn: isbn }, { $set: { "active": true } }).then((result) => {
            response.status(200).json({ "success": "Request approved!" });
        }).catch((error) => {
            response.status(400).json({ "error": "Request failed to be approved!" });
        });
    }

    delete = (request: express.Request, response: express.Response) => {
        const isbn = request.body.isbn;

        BookModel.collection.deleteOne({ isbn: isbn }).then((user) => {
            response.status(200).json({ "success": "Request declined!" });
        }).catch((error) => {
            response.status(400).json({ "error": "Request failed to be declined!" });
        });
    }

}