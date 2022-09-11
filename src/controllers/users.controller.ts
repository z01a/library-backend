import * as express from "express"
import UserModel from "../models/user.model"

export class UsersController {
    fetchAllUsers = (request: express.Request, response: express.Response) => {
        UserModel.find({}, (error: any, users: any) => {
            if(error) {
                response.status(400).json({ "error": "Failed to fetch all users" })
            } else {
                response.status(200).json(users);
            }
        });
    }

    register = (request: express.Request, response: express.Response) => {
        let user = new UserModel(
            {
                firstname: request.body.firstname,
                lastname: request.body.lastname,
                username: request.body.username,
                password: request.body.password,
                address: request.body.address,
                email: request.body.email,
                phone: request.body.phone,
                picture: request.body.picture,
                moderator: false,
                active: false
            })

        // TODO: Check if user already exist or maybe we can do in database model?

        user.save().then(user => {
            response.status(200).json({ "message": "User added" })
        }).catch(error => {
            response.status(400).json({ "error": "Failed to register user" })
        });
    }
}