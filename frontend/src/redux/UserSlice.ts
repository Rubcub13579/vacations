import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

export function initUser(_currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const userToInit = action.payload;
    const newState = userToInit;
    return newState;
}

export function logoutUser(_currentState: UserModel, _action: PayloadAction): UserModel {
    return null;
}

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: { initUser, logoutUser }
});