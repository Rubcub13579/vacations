import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacation-model";
import { fileSaver } from "uploaded-file-saver"
import { ClientError } from "../3-models/client-error";
import { StatusCode } from "../3-models/enums";

class VacationService {

    public async getAllVacations(): Promise<VacationModel[]> {
        const sql = "select * from vacations";
        const vacations = await dal.execute(sql) as VacationModel[];
        return vacations;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        const sql = "select * from vacations where id = ?";
        const values = [vacationId];
        const vacations = await dal.execute(sql, values) as VacationModel[]
        const vacation = vacations[0];
        return vacation
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {

        // vacation.validate();

        const imageName = vacation.image ? await fileSaver.add(vacation.image) : null;

        const sql = "insert into vacations (destination, description, startDate, endDate, price, imageName) values(?, ?, ?, ?, ?, ?)";
        const values = [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName];

        const info = await dal.execute(sql, values) as OkPacketParams

        const dbVacation = await this.getOneVacation(info.insertId);
        console.log(dbVacation);
        
        return dbVacation;
    }

    public async deleteVacation(id: number): Promise<void> {

        const oldFileName = await this.getImageName(id);

        const sql = "delete from vacations where id = ?";
        const values = [id];

        const info = await dal.execute(sql, values) as OkPacketParams;

        if(info.affectedRows === 0) throw new ClientError(StatusCode.NotFound, `id ${id} not found`);

        await fileSaver.delete(oldFileName);
    }


    private async getImageName(id: number): Promise<string> {
        const sql = "select imageName from vacations where id = ?";
        const values = [id];
        const vacations = await dal.execute(sql, values);
        const vacation = vacations[0];
        if(!vacation) return null;
        return vacation.imageName
    }




}




export const vacationService = new VacationService();