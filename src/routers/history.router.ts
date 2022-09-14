import express from "express";
import { HistoryController } from "../controllers/history.controller";

const HistoryRouter = express.Router();

HistoryRouter.route("/").get(
    (request, response) => new HistoryController().fetch(request, response)
);

export default HistoryRouter;