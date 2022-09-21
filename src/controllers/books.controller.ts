import * as express from "express"
import HistoryModel from "../models/history.model";
import * as jwt from "jsonwebtoken"

import BookModel from "../models/book.model"

export class BooksController {

    private static getUsernameFromToken = (token: string | undefined) => {
        if(token) {
            try {
                var decoded: any = jwt.verify(token, "leetspeak");

                return decoded.username;
            } catch(error) {
                return undefined
            }
        }
    }

    fetch = (request: express.Request, response: express.Response) => {
        BookModel.find({ active: true }, (error: any, books: any) => {
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
                // TODO: Fix this cover image so we can upload our own cover image
                cover: request.body.cover,
                authors: request.body.authors,
                genres: request.body.genres,
                active: false
            })

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

    recommended = async (request: express.Request, response: express.Response) => {
        const date: Date = new Date()
        date.setHours(0, 0, 0, 0)

        let recommended: any[] | null = await BookModel.findOne({ recommended: date});
        if(recommended) {
            response.status(200).json(recommended);
        } else {
            let recommended: any[] = await BookModel.aggregate([{ $sample: { size: 1 } }]);
            if(recommended) {
                await BookModel.updateOne({ isbn: recommended[0].isbn}, {$set: { 'recommended': date }})
                response.status(200).json(recommended);
            }
        }
    }

    comment = (request: express.Request, response: express.Response) => {
        const isbn = request.params.id;
        const comment = request.body.comment;

        let username = BooksController.getUsernameFromToken(request.headers.authorization);

        BookModel.updateOne({ isbn: isbn}, { $push: { comments: {
            username: username,
            comment: comment
        }} }).then((user) => {
            response.status(200).json({ "success": "Comment added!" });
        }).catch((error) => {
            response.status(400).json({ "error": "Failed to add comment!" });
        });
    }

    popular = (request: express.Request, response: express.Response) => {
        HistoryModel.aggregate([
            {
                $group: {
                    _id: '$isbn',
                    count: {
                      $sum: 1
                    }
                  }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: "_id",
                    foreignField: "isbn",
                    as: "book"
                }
            },
            {
            $sort: {
                count: -1
            }
        }]).limit(3).then(result => {
                response.status(200).json(result);
            }).catch(error => {
                response.status(401).send();
            });
    }

}