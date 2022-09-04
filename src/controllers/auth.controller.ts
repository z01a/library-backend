import * as express from "express"
import * as jwt from "jsonwebtoken"

import UserModel from "../models/user.model"

export class AuthController {

    authenticate = (request: express.Request, response: express.Response) => {
        let username = request.body.username;
        let password = request.body.password;

        const user  = UserModel.findOne({username: username, password: password}, (error: any, user: any ) => {
            if(error) {
                response.sendStatus(401);
            } else if(user) {
                const myUser = user as typeof UserModel;
                var token = jwt.sign( { username: username }, "leetspeek", { expiresIn: "2h" });
                response.json(token);
            }
            else {
                response.sendStatus(401);
            }
        });
    }
}