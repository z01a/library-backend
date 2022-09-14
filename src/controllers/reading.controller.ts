import * as express from "express"
import * as jwt from "jsonwebtoken"

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