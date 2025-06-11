import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LikesModel } from "../Models/LikesModel";

export function initLikes(currentState: LikesModel[], action: PayloadAction<LikesModel[]>) {
    const likesToInit = action.payload;
    const newState = likesToInit;
    return newState
}

export const likesSlice = createSlice({
    name: "likes",
    initialState: [],
    reducers: { initLikes }
})
