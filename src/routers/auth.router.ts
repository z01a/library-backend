import express, { response } from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";

const AuthRouter = express.Router();

AuthRouter.route("/").post(
    (request, response) => new AuthController().authenticate(request, response)
);

export default AuthRouter;