import express from "express";
import { ReadingController } from "../controllers/reading.controller";

const ReadingRouter = express.Router();

ReadingRouter.route("/:id").get(
    (request, response) => new ReadingController().fetch(request, response)
);

export default ReadingRouter;