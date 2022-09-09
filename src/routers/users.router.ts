import express from "express";
import { UsersController } from "../controllers/users.controller";

const UsersRouter = express.Router();

UsersRouter.route("/").get(
    (request, response) => new UsersController().fetchAllUsers(request, response)
);

UsersRouter.route("/register").post(
    (request, response) => new UsersController().register(request, response)
);

export default UsersRouter;