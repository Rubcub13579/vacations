import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacation-model";
import { fileSaver } from "uploaded-file-saver"
import { ClientError } from "../3-models/client-error";
import { StatusCode } from "../3-models/enums";
import { appConfig } from "../2-utils/app-config";

class VacationService {

    public async getAllVacations(): Promise<VacationModel[]> {
        const sql = "select id,destination, description, startDate, endDate, price, concat(?, imageName) as imageUrl from vacations";
        const values = [appConfig.imagesUrl]

        const vacations = await dal.execute(sql, values) as VacationModel[];
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

        vacation.validate();

        const imageName = vacation.image ? await fileSaver.add(vacation.image) : null;

        const sql = "insert into vacations (destination, description, startDate, endDate, price, imageName) values(?, ?, ?, ?, ?, ?)";
        const values = [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName];

        const info = await dal.execute(sql, values) as OkPacketParams

        const dbVacation = await this.getOneVacation(info.insertId);
        console.log(dbVacation);

        return dbVacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {

        vacation.validate();

        const imageName = vacation.image ? await fileSaver.add(vacation.image) : null;


        const sql = "UPDATE vacations SET destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageName = ? WHERE id = ?;";
        const values = [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName, vacation.id];

        const info = await dal.execute(sql, values) as OkPacketParams;

        if (info.affectedRows === 0) throw new ClientError(StatusCode.NotFound, `id ${vacation.id} not exist`);

        const dbVacation = await this.getOneVacation(vacation.id);

        return dbVacation

    }

    public async deleteVacation(id: number): Promise<void> {

        const oldFileName = await this.getImageName(id);

        const sql = "delete from vacations where id = ?";
        const values = [id];

        const info = await dal.execute(sql, values) as OkPacketParams;

        if (info.affectedRows === 0) throw new ClientError(StatusCode.NotFound, `id ${id} not found`);

        await fileSaver.delete(oldFileName);
    }

    private async getImageName(id: number): Promise<string> {
        const sql = "select imageName from vacations where id = ?";
        const values = [id];
        const vacations = await dal.execute(sql, values);
        const vacation = vacations[0];
        if (!vacation) return null;
        return vacation.imageName
    }

    public async likeVacation(userId: number, vacationId: number): Promise<void> {
        const checkSql = "SELECT * FROM likes WHERE userId = ? AND vacationId = ?";
        const values = [userId, vacationId];
        const existing = await dal.execute(checkSql, values);
        if ((existing as any[]).length > 0) return;
        const insertSql = "INSERT INTO likes (userId, vacationId) values(?,?)";
        await dal.execute(insertSql, values);
    }

    public async unlikeVacation(userId: number, vacationId: number): Promise<void> {
        const sql = "DELETE FROM likes WHERE userId = ? AND vacationId = ?";
        const values = [userId, vacationId];
        await dal.execute(sql, values)
    }

    public async getVacationLikes(vacationId: number, userId: number): Promise<{ likesCount: number, isLikedByUser: boolean }> {
        const sql = `
            SELECT
                (SELECT COUNT(*) FROM likes WHERE vacationId = ?) AS likesCount,
                EXISTS(SELECT * FROM likes WHERE vacationId = ? AND userId = ?) AS isLikedByUser
        `;
        const result = await dal.execute(sql, [vacationId, vacationId, userId]);
        return {
            likesCount: result[0].likesCount,
            isLikedByUser: result[0].isLikedByUser === 1
        };
    }
    
    



}




export const vacationService = new VacationService();