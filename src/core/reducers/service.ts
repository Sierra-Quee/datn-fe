import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IService } from "../../utils/model";
import { getAllServiceApi } from "../../api/service/serviceAPI";

interface IServiceSlice {
    service: IService;
    isLoadingService: boolean;
}
const initialState = {
    service: {
        serviceId: -1,
        name: "",
        type: -1,
        price: -1,
        rate: -1,
        desc: "",
        createdAt: -1,
        updatedAt: -1,
        skillId: -1,
        skill: {},
        image: "",
    },
    isLoadingService: false,
};

export const getAllServiceAsync = createAsyncThunk(
    "Service",
    async (id: number) => {
        var response = await getAllServiceApi(id);
        return response.data;
    }
);

export const ServiceSlice = createSlice({
    name: "serviceAll",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
        setAllService: (state, action) => {
            state.service = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllServiceAsync.pending, (state, action) => {
                state.isLoadingService = true;
            })
            .addCase(getAllServiceAsync.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.service = data;
                state.isLoadingService = false;
            })
            .addCase(
                getAllServiceAsync.rejected,
                (state, action: PayloadAction<any>) => {
                    state.isLoadingService = false;
                }
            );
    },
});

export default ServiceSlice.reducer;

export const { setAllService } = ServiceSlice.actions;
