import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";



export function initVacation(_currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    const vacationToInit = action.payload;
    const newState = vacationToInit;
    return newState;
}

export function addVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const vacationToAdd = action.payload;
    const newState = [...currentState];
    newState.push(vacationToAdd);
    return newState;
}

export function updateVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const vacationToUpdate = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(v => v.id === vacationToUpdate.id);
    newState[index] = vacationToUpdate
    return newState;
}

export function deleteVacation(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
    const idToDelete = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(v => v.id === idToDelete);
    newState.splice(index, 1);
    return newState;
}

export const vacationSlice = createSlice({
    name: "vacations",
    initialState: [],
    reducers: {initVacation, addVacation, updateVacation, deleteVacation}
})

