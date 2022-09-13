import * as express from "express"
import UserModel from "../models/user.model"
import * as jwt from "jsonwebtoken"

export class UsersController {
    fetch = (request: express.Request, response: express.Response) => {
        UserModel.find({}, (error: any, users: any) => {
            if(error) {
                response.status(400).json({ "error": "Failed to fetch all users" })
            } else {
                response.status(200).json(users);
            }
        });
    }

    currentUser = async (request: express.Request, response: express.Response) => {
        let token = request.headers.authorization;

        if(token) {
            try {
                var decoded: any = jwt.verify(token, "leetspeak");
            } catch(error) {
                response.status(401).json({ "error": "JWT is not valid!" });
            }

            const username = decoded.username;

            let user = await UserModel.findOne({ username: username });
            if(user) {
                response.status(200).json(user);
            } else {
                response.status(401).json({ "error": "JWT is not valid!" });
            }
        } else {
            response.status(200).json({ "success": "There is not JWT!" });
        }
    }

    fetchUser = (request: express.Request, response: express.Response) => {
        UserModel.findOne({ username: request.params.id }, (error: any, user: any) => {
            if(error) {
                response.status(400).json({ "error": "Failed to fetch user" })
            } else {
                response.status(200).json(user);
            }
        });
    }

    requests = (request: express.Request, response: express.Response) => {
        UserModel.find({ active: false }, (error: any, users: any) => {
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

    modify = (request: express.Request, response: express.Response) => {
        const username = request.body.username;
        const firstname = request.body.firstname;
        const lastname = request.body.lastname;
        const address = request.body.address;
        const email = request.body.email;
        const phone = request.body.phone;
        const moderator = request.body.moderator;
        const active = request.body.active;


        UserModel.collection.updateOne({ username: username}, {$set: {
            "firstname": firstname,
            "lastname": lastname,
            "address": address,
            "email": email,
            "phone": phone,
            "moderator": moderator,
            "active": active
        }}).then(result => {
            response.status(200).json({ "message": "User modified!" })
        }).catch(error => {
            response.status(400).json({ "error": "Failed to modify user" })
        });
        // TODO: Check if user already exist or maybe we can do in database model?

        // user.save().then(user => {
        //     response.status(200).json({ "message": "User added" })
        // }).catch(error => {
        //     response.status(400).json({ "error": "Failed to register user" })
        // });
    }

    approve = (request: express.Request, response: express.Response) => {
        const username = request.body.username;
        console.log(username)

        UserModel.collection.updateOne({ username: username }, { $set: { "active": true } }).then((result) => {
            response.status(200).json({ "success": "Request approved!" });
        }).catch((error) => {
            response.status(400).json({ "error": "Request failed to be approved!" });
        });
    }

    delete = (request: express.Request, response: express.Response) => {
        const username = request.body.username;

        UserModel.collection.deleteOne({ username: username }).then((user) => {
            response.status(200).json({ "success": "Request declined!" });
        }).catch((error) => {
            response.status(400).json({ "error": "Request failed to be declined!" });
        });
    }
}