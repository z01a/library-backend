import express from "express";
import { ConfigController } from "../controllers/config.controller";
import { ReadingController } from "../controllers/reading.controller";

const ConfigRouter = express.Router();

ConfigRouter.route("/").get(
    (request, response) => new ConfigController().fetch(request, response)
);

ConfigRouter.route("/loan").get(
    (request, response) => new ConfigController().getLoan(request, response)
);

ConfigRouter.route("/loan/:id").put(
    (request, response) => new ConfigController().setLoan(request, response)
);

export default ConfigRouter;