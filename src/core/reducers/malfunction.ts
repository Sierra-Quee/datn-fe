import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMalfunction, defaultMalfunction } from "../../utils/model";
import {
    createMalfunction,
    getAllMalfunction,
} from "../../api/malfunction/malfunctionAPI";

export interface IMalfunctionSlice {
    malfunctionList: IMalfunction[];
    malfunction: IMalfunction;
}
export const getAllMalfunctionAsync = createAsyncThunk(
    "getAllMalfunction",
    async () => {
        var response = await getAllMalfunction();
        return response.data;
    }
);

export const createMalfunctionAsync = createAsyncThunk(
    "createMalfunction",
    async (body: IMalfunction) => {
        return (await createMalfunction(body)).data;
    }
);
const initialState: IMalfunctionSlice = {
    malfunctionList: [],
    malfunction: defaultMalfunction,
};
export const malfunctionSlice = createSlice({
    name: "malfunctionAll",
    initialState,
    reducers: {
        clearListMalfunction: (state) => {
            state.malfunctionList = [];
        },
        clearMalfunction: (state) => {
            state.malfunction = defaultMalfunction;
        },
        setMalfunction: (state, action) => {
            state.malfunction = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMalfunctionAsync.fulfilled, (state, action) => {
                state.malfunctionList = action.payload;
            })
            .addCase(createMalfunctionAsync.fulfilled, (state, action) => {
                state.malfunction = action.payload;
            });
    },
});
export default malfunctionSlice.reducer;
export const { setMalfunction, clearListMalfunction, clearMalfunction } =
    malfunctionSlice.actions;
