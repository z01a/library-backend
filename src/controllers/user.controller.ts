import * as express from "express"
import UserModel from "../models/user.model"

export class UserController {
    fetchAllUsers = (request: express.Request, response: express.Response) => {
        UserModel.find({}, (error: any, users: any) => {
            if(error) {
                console.log("Unable to fetch all users!");
            } else {
                response.json(users);
            }
        });
    }
}