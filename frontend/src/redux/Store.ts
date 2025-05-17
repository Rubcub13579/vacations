import { configureStore } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";
import { userSlice } from "./UserSlice";
import { vacationSlice } from "./VacationSlice";



export type AppState = {
    vacations: VacationModel[];
    user: UserModel;
}


export const store = configureStore<AppState>({
    reducer: {
        vacations: vacationSlice.reducer,
        user: userSlice.reducer
    }
});