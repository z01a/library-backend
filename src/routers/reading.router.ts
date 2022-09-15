import express from "express";
import { ReadingController } from "../controllers/reading.controller";

const ReadingRouter = express.Router();

ReadingRouter.route("/").get(
    (request, response) => new ReadingController().fetch(request, response)
);

ReadingRouter.route("/take/:id").get(
    (request, response) => new ReadingController().take(request, response)
);

ReadingRouter.route("/return/:id").get(
    (request, response) => new ReadingController().return(request, response)
);

export default ReadingRouter;