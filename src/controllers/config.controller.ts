import * as express from "express"
import * as jwt from "jsonwebtoken"
import ConfigModel from "../models/config.model";
import HistoryModel from "../models/history.model";

export class ConfigController {

    private static getUsernameFromToken = (token: string | undefined) => {
        if(token) {
            try {
                var decoded: any = jwt.verify(token, "leetspeak");

                return decoded.username;
            } catch(error) {
                return undefined
            }
        }
    }

    fetch = (request: express.Request, response: express.Response) => {
        ConfigModel.findOne({ envoirment: "live" }).then((result: any) => {
            response.status(200).json(result.config)
        }).catch(() => {
            response.status(401).send()
        });
    }

    setLoan = (request: express.Request, response: express.Response) => {
        ConfigModel.updateOne({ envoirment: "live" }, { $set: { "config.maxLoanDays": request.params.id }}).then(() => {
            response.status(200).send()
        }).catch(() => {
            response.status(401).send()
        });
    }

    getLoan = async (request: express.Request, response: express.Response) => {
        ConfigModel.find({ envoirment: "live" }).then((result: any) => {
            response.status(200).json({ "maxLoanDays": result.config.maxLoanDays })
        }).catch((error) => {
            response.status(200).json({ "maxLoanDays": 14 })
        });
    }

}