import axios, { AxiosRequestConfig } from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../redux/Store";
import { vacationSlice } from "../redux/VacationSlice";
import { LikesModel } from "../Models/LikesModel";
import { likesSlice } from "../redux/LikesSlice";


class VacationService {

    public async getAllVacations(): Promise<VacationModel[]> {

        if (store.getState().vacations.length > 0) return store.getState().vacations;

        const {data:vacations} = await axios.get<VacationModel[]>(appConfig.VacationsUrl);
        
        const action = vacationSlice.actions.initVacation(vacations);
        store.dispatch(action);

        return vacations;
    }
    public async getOneVacation(id: number): Promise<VacationModel> {

        const vacation = store.getState().vacations.find(v => v.id === id);
        if (vacation) return vacation

        const response = await axios.get<VacationModel>(appConfig.VacationsUrl + id);
        const dbVacation = response.data

        return dbVacation
    }

    public async addVacation(vacation: VacationModel): Promise<void> {

        this.getAllVacations()

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
        await axios.post(appConfig.LikesUrl + id, null, { headers });
    }

    public async unlike(id: number): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        await axios.delete(appConfig.LikesUrl + id, { headers });
    }

    public async showLikes(id: number): Promise<{ likesCount: number, isLikedByUser: boolean }> {
        const response = await axios.get(appConfig.LikesUrl + id);
        const dbLikes = response.data;
        return dbLikes
    }

    public async getAllLikes(): Promise<LikesModel[]> {
        if(store.getState().likes.length > 0) return store.getState().likes;
        const response = await axios.get(appConfig.allLikesUrl);
        const AllLikes = response.data;
        const action = likesSlice.actions.initLikes(AllLikes);
        store.dispatch(action)
        return AllLikes;
    }

}

export const vacationService = new VacationService();
