import { configureStore } from "@reduxjs/toolkit";
import { LikesModel } from "../Models/LikesModel";
import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";
import { likesSlice } from "./LikesSlice";
import { userSlice } from "./UserSlice";
import { vacationSlice } from "./VacationSlice";



export type AppState = {
    vacations: VacationModel[];
    likes: LikesModel[];
    user: UserModel;
}


export const store = configureStore<AppState>({
    reducer: {
        likes: likesSlice.reducer,
        vacations: vacationSlice.reducer,
        user: userSlice.reducer
    }
});