import express, { NextFunction, Request, Response } from "express";
import { vacationService } from "../4-services/vacation-service";
import { VacationModel } from "../3-models/vacation-model";
import { StatusCode } from "../3-models/enums";
import { securityMiddleware } from "../6-middleware/security-middleware";
import fileUpload, { UploadedFile } from "express-fileupload";


class VacationsController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/api/vacations", this.getAllVacations);
        this.router.get("/api/vacations/:id", this.getOneVacation);
        this.router.post("/api/vacations", securityMiddleware.validate, securityMiddleware.validateAdmin, this.addVacation);
        this.router.delete("/api/vacations/:id", securityMiddleware.validate, securityMiddleware.validateAdmin, this.deleteVacation);
    }



    private async getAllVacations(req: Request, res: Response, next: NextFunction) {
        try {
            const vacations = await vacationService.getAllVacations();
            res.json(vacations);
        }
        catch (err: any) { next(err) }
    }

    private async getOneVacation(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id
            const vacation = await vacationService.getOneVacation(id);
            res.json(vacation)
        }
        catch (err: any) { next(err) }
    }

    private async addVacation(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.image = req.files?.image;
            const vacation = new VacationModel(req.body)
            const dbVacation = await vacationService.addVacation(vacation);
            res.status(StatusCode.Created).json(dbVacation);
        }
        catch (err: any) { next(err) }
    }

    private async deleteVacation(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            await vacationService.deleteVacation(id);
            res.status(StatusCode.NoContend).json()

        }
        catch (err: any) { next(err) }
    }

}

export const vacationsController = new VacationsController();