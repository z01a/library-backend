import * as express from "express"
import * as jwt from "jsonwebtoken"

import UserModel from "../models/user.model"
import AdminModel from "../models/admin.model"
import { Role } from "../enums/role"
import { Admin } from "mongodb"

export class AuthController {

    authenticate = (request: express.Request, response: express.Response) => {
        let username = request.body.username;
        let password = request.body.password;

        let elevated = request.body.elevated;

        if(elevated) {
            const admin  = AdminModel.findOne({username: username, password: password}, (error: any, admin: any ) => {
                if(error) {
                    response.status(401).json({"error": "Failed to authenticate!"});
                } else if(admin) {
                    const myAdmin = admin as typeof AdminModel;
                    var token = jwt.sign( { username: username }, "leetspeak", { expiresIn: "2h" });
                    response.status(200).json({ "success": "Authentication is successfull!", "token": token });
                }
                else {
                    response.status(401).json({"error": "Failed to authenticate!"});
                }
            });
        } else {
            const user  = UserModel.findOne({username: username, password: password}, (error: any, user: any ) => {
                if(error) {
                    response.status(401).json({"error": "Failed to authenticate!"});
                } else if(user && user.active) {
                    const myUser = user as typeof UserModel;
                    var token = jwt.sign( { username: username }, "leetspeak", { expiresIn: "2h" });
                    response.status(200).json({ "success": "Authentication is successfull!", "token": token });
                }
                else {
                    response.status(401).json({"error": "Failed to authenticate!"});
                }
            });
        }
    }

    validate = async (request: express.Request, response: express.Response) => {
        // TODO: What token should I validate?
        let headerToken = request.headers.authorization;
        
        let token = request.body.token;

        if(token) {
            try {
                var decoded: any = jwt.verify(token, "leetspeak");
            } catch(error) {
                response.status(401).json({ "error": "JWT is not valid!" , role: Role.Guest });
            }

            const username = decoded.username;

            let administrator = await AdminModel.findOne({ username: username });
            if(administrator) {
                response.status(200).json({ "success": "JWT is valid!", role: Role.Administrator });
            } else {
                let user = await UserModel.findOne({ username: username });
                if(user) {
                    if(user.moderator) {
                        response.status(200).json({ "success": "JWT is valid!", role: Role.Moderator });
                    } else {
                        response.status(200).json({ "success": "JWT is valid!", role: Role.User });
                    }
                }
            }
        } else {
            response.status(200).json({ "success": "There is not JWT!", role: Role.Guest });
        }
    }

}