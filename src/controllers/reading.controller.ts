import * as express from "express"
import * as jwt from "jsonwebtoken"
import HistoryModel from "../models/history.model";
import BookModel from "../models/book.model";

import ReadingModel from "../models/reading.model"

export class ReadingController {

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

    take = async (request: express.Request, response: express.Response) => {
        let username = ReadingController.getUsernameFromToken(request.headers.authorization);
        let isbn = request.params.id;

        let reading = new ReadingModel({
            username: username,
            isbn: isbn,
            taken: Date()
        });

        await reading.save();

        await BookModel.updateOne({ isbn: isbn }, { $inc: { 'count': -1 }});

        response.status(200).send();
    }

    return = async (request: express.Request, response: express.Response) => {
        let username = ReadingController.getUsernameFromToken(request.headers.authorization);
        let isbn = request.params.id;

        let reading = await ReadingModel.findOneAndDelete({ username: username, isbn: isbn});
        if(reading) {
            await HistoryModel.insertMany({username: username, isbn: isbn, taken: reading.taken, returned: Date() });
        }

        await BookModel.updateOne({ isbn: isbn }, { $inc: { 'count': 1 }});

        response.status(200).send();
    }

    fetch = (request: express.Request, response: express.Response) => {
        let username = ReadingController.getUsernameFromToken(request.headers.authorization);

        ReadingModel.aggregate([
            {
                $match: { username: username }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: "isbn",
                    foreignField: "isbn",
                    as: "reading"
                }
            }]).then(result => {
                response.status(200).json(result);
            }).catch(error => {
                response.status(401).send();
            });
    }

}