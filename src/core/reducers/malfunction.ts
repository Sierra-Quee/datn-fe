import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    AssignRepair,
    assignRepair,
    getAllByUserIdOrder,
    getAllOrder,
    getDetailOrderById,
} from "../../api/order/orderAPI";
import { IOrder, defaultOrder } from "../../utils/model";

// export interface  {}
const initialState = {};
export const malfunctionSlice = createSlice({
    name: "malfunctionAll",
    initialState,
    reducers: {
        // clearListOrder: (state) => {
        //     state.orderList = [];
        // },
        // clearListOrderByUser: (state) => {
        //     state.orderUser = [];
        // },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getAllOrderAsync.pending, (state, action) => {
    //             state.loadingListOrder = true;
    //         })
    //         .addCase(getAllOrderAsync.fulfilled, (state, action) => {
    //             state.loadingListOrder = false;
    //             state.orderList = action.payload;
    //         })
    //         .addCase(getAllOrderAsync.rejected, (state, action) => {
    //             state.loadingListOrder = false;
    //         })
    //         .addCase(getAllByUserIdOrderAsync.pending, (state, action) => {
    //             state.loadingGetOrderByUserId = true;
    //         })
    //         .addCase(getAllByUserIdOrderAsync.fulfilled, (state, action) => {
    //             state.loadingGetOrderByUserId = false;
    //             state.orderUser = action.payload;
    //         })
    //         .addCase(getAllByUserIdOrderAsync.rejected, (state, action) => {
    //             state.loadingGetOrderByUserId = false;
    //         })
    //         .addCase(getDetailOrderAsync.pending, (state, action) => {
    //             state.loadingDetailOrder = true;
    //         })
    //         .addCase(getDetailOrderAsync.fulfilled, (state, action) => {
    //             state.loadingDetailOrder = false;
    //             state.detailOrder = action.payload;
    //         })
    //         .addCase(getDetailOrderAsync.rejected, (state, action) => {
    //             state.loadingDetailOrder = false;
    //         })
    //         .addCase(assignRepairAsync.pending, (state, action) => {
    //             state.loadingAssignOrder = true;
    //         })
    //         .addCase(assignRepairAsync.fulfilled, (state, action) => {
    //             state.loadingAssignOrder = false;
    //         })
    //         .addCase(assignRepairAsync.rejected, (state, action) => {
    //             state.loadingAssignOrder = false;
    //         });
    // },
});
export default malfunctionSlice.reducer;
export const {} = malfunctionSlice.actions;
