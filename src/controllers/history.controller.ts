import * as express from "express"
import * as jwt from "jsonwebtoken"
import HistoryModel from "../models/history.model";

export class HistoryController {

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
        let username = HistoryController.getUsernameFromToken(request.headers.authorization);

        HistoryModel.aggregate([
            {
                $match: { username: username }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: "isbn",
                    foreignField: "isbn",
                    as: "history"
                }
            }]).then(result => {
                response.status(200).json(result);
            }).catch(error => {
                response.status(401).send();
            });
    }

}