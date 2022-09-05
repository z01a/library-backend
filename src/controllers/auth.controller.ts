import * as express from "express"
import * as jwt from "jsonwebtoken"

import UserModel from "../models/user.model"

export class AuthController {

    authenticate = (request: express.Request, response: express.Response) => {
        let username = request.body.username;
        let password = request.body.password;

        const user  = UserModel.findOne({username: username, password: password}, (error: any, user: any ) => {
            if(error) {
                response.status(401).json({"error": "Failed to authenticate!"});
            } else if(user) {
                const myUser = user as typeof UserModel;
                var token = jwt.sign( { username: username }, "leetspeak", { expiresIn: "2h" });
                response.status(200).json({ "success": "Authentication is successfull!", "token": token });
            }
            else {
                response.status(401).json({"error": "Failed to authenticate!"});
            }
        });
    }

    validate = (request: express.Request, response: express.Response) => {
        let headerToken = request.headers.authorization;
        let token = request.body.token;

        if(token) {
            try {
                var decoded = jwt.verify(token, "leetspeak");
                response.status(200).json({ "success": "JWT is valid!" });
            } catch(error) {
                response.status(401).json({ "error": "JWT is not valid!" });
            }
        } else {
            response.status(401).json({ "error": "JWT is not valid!" });
        }
    }

}