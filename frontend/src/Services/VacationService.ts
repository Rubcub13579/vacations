import axios, { AxiosRequestConfig } from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../redux/Store";
import { vacationSlice } from "../redux/VacationSlice";


class VacationService {

    public async getAllVacations(): Promise<VacationModel[]> {

        if (store.getState().vacations.length > 0) return store.getState().vacations;

        const response = await axios.get<VacationModel[]>(appConfig.VacationsUrl);
        const vacations = response.data

        const action = vacationSlice.actions.initVacation(vacations);
        store.dispatch(action)

        return vacations
    }

    public async addVacation(vacation: VacationModel): Promise<void> {

        const headers = { "Content-Type": "multipart/form-data" };

        const response = await axios.post<VacationModel>(appConfig.VacationsUrl, vacation, { headers });
        const dbVacation = response.data;

        const action = vacationSlice.actions.addVacation(dbVacation);
        store.dispatch(action)
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {

        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const response = await axios.put<VacationModel>(appConfig.VacationsUrl + vacation.id, vacation, config);
        const dbVacation = response.data;

        const action = vacationSlice.actions.updateVacation(dbVacation);
        store.dispatch(action)
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.VacationsUrl + id);
        const action = vacationSlice.actions.deleteVacation(id);
        store.dispatch(action);
    }

    public async like(id: number): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        await axios.post(appConfig.VacationsUrl + "like/" + id, null, { headers });
    }

    public async unlike(id: number): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        await axios.delete(appConfig.VacationsUrl + "unlike/" + id, { headers });
    }

    public async showLikes(id: number): Promise<{ likesCount: number, isLikedByUser: boolean }> {
        const response = await axios.get(appConfig.VacationsUrl + "likes/" + id);
        const dbLikes = response.data;
        return dbLikes
    }


}

export const vacationService = new VacationService();
