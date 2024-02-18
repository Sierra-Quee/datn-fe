import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createMalfunction,
    createMultiMalfunctionAPI,
    getAllMalfunction,
    getMalfunctionByServiceId,
    updateMalfunction,
} from "../../api/malfunction/malfunctionAPI";
import { IMalfunction, defaultMalfunction } from "../../utils/model";

export interface IMalfunctionSlice {
    malfunctionList: IMalfunction[];
    malfunction: IMalfunction;
    updateMalfunctionStatus: "success" | "failed" | "none";
    createMulMalfunctionStatus: "success" | "failed" | "none";
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

export const createMultiMalfunctionAsync = createAsyncThunk(
    "createMultiMal",
    async (body: IMalfunction[]) => {
        return (await createMultiMalfunctionAPI(body)).data;
    }
);

export const getAllMalfunctionByServiceIdAsync = createAsyncThunk(
    "getMalfunctionByServiceId",
    async (serviceId: number) => {
        const response = await getMalfunctionByServiceId(serviceId);
        return response.data;
    }
);

export const updateMalfunctionAsync = createAsyncThunk(
    "updateMalfunction",
    async (body: IMalfunction) => {
        const response = await updateMalfunction(body);
        return response.data;
    }
);
const initialState: IMalfunctionSlice = {
    malfunctionList: [],
    malfunction: defaultMalfunction,
    updateMalfunctionStatus: "none",
    createMulMalfunctionStatus: "none",
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
                state.updateMalfunctionStatus = "success";
            })
            .addCase(createMultiMalfunctionAsync.fulfilled, (state, action) => {
                state.createMulMalfunctionStatus = "success";
            })
            .addCase(
                createMultiMalfunctionAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.createMulMalfunctionStatus = "failed";
                }
            )
            .addCase(
                getAllMalfunctionByServiceIdAsync.fulfilled,
                (state, action) => {
                    state.malfunctionList = action.payload;
                }
            )
            .addCase(updateMalfunctionAsync.fulfilled, (state, action) => {
                state.malfunction = action.payload;
                state.updateMalfunctionStatus = "success";
            })
            .addCase(
                updateMalfunctionAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.updateMalfunctionStatus = "failed";
                }
            );
    },
});
export default malfunctionSlice.reducer;
export const { setMalfunction, clearListMalfunction, clearMalfunction } =
    malfunctionSlice.actions;
