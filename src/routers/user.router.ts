import express, { response } from "express";
import { UserController } from "../controllers/user.controller";

const UserRouter = express.Router();

UserRouter.route("/").get(
    (request, response) => new UserController().fetchAllUsers(request, response)
);

export default UserRouter;