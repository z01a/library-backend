import * as express from "express"
import * as jwt from "jsonwebtoken"

import UserModel from "../models/user.model"
import AdminModel from "../models/admin.model"
import { Role } from "../enums/role"
import { Admin } from "mongodb"
import ReadingModel from "../models/reading.model"

export class ReadingController {

    fetch = (request: express.Request, response: express.Response) => {
        let username = request.body.username;

        ReadingModel.aggregate([{
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