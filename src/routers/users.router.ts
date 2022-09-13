import express from "express";
import { UsersController } from "../controllers/users.controller";

const UsersRouter = express.Router();

UsersRouter.route("/").get(
    (request, response) => new UsersController().fetch(request, response)
);

UsersRouter.route("/requests").get(
    (request, response) => new UsersController().requests(request, response)
);

UsersRouter.route("/:id").get(
    (request, response) => new UsersController().fetchUser(request, response)
);

UsersRouter.route("/requests/approve").post(
    (request, response) => new UsersController().approve(request, response)
);

UsersRouter.route("/requests/delete").post(
    (request, response) => new UsersController().delete(request, response)
);

UsersRouter.route("/register").post(
    (request, response) => new UsersController().register(request, response)
);

export default UsersRouter;