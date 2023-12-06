import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    AssignRepair,
    assignRepair,
    getAllByUserIdOrder,
    getAllOrder,
    getDetailOrderById,
} from "../../api/order/orderAPI";
import { IOrder, defaultOrder } from "../../utils/model";

export enum OrderStatus {
    PENDING,
    REJECTED,
    FINDING,
    ACCEPTED,
    CHECKEDIN,
    COMPLETE,
}

interface IOrderSlice {
    orderList: IOrder[];
    orderUser: IOrder[];
    loadingDetailOrder: boolean;
    loadingGetOrderByUserId: boolean;
    loadingListOrder: boolean;
    loadingAssignOrder: boolean;
    detailOrder: IOrder;
}
const initialState: IOrderSlice = {
    orderList: [],
    orderUser: [],
    loadingDetailOrder: false,
    loadingListOrder: false,
    loadingAssignOrder: false,
    detailOrder: defaultOrder,
    loadingGetOrderByUserId: false,
};

export const getAllOrderAsync = createAsyncThunk("getAllOrder", async () => {
    const res = await getAllOrder();
    return res.data;
});

export const getAllByUserIdOrderAsync = createAsyncThunk(
    "getAllOrderByUser",
    async (id: number) => {
        return (await getAllByUserIdOrder(id)).data;
    }
);
export const getDetailOrderAsync = createAsyncThunk(
    "getDetailOrder",
    async (id: number) => {
        return (await getDetailOrderById(id)).data;
    }
);
export const assignRepairAsync = createAsyncThunk(
    "assignRepair",
    async (param: AssignRepair) => {
        return (await assignRepair(param)).data;
    }
);
export const orderSlice = createSlice({
    name: "orderAll",
    initialState,
    reducers: {
        clearListOrder: (state) => {
            state.orderList = [];
        },
        clearListOrderByUser: (state) => {
            state.orderUser = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrderAsync.pending, (state, action) => {
                state.loadingListOrder = true;
            })
            .addCase(getAllOrderAsync.fulfilled, (state, action) => {
                state.loadingListOrder = false;
                state.orderList = action.payload;
            })
            .addCase(getAllOrderAsync.rejected, (state, action) => {
                state.loadingListOrder = false;
            })
            .addCase(getAllByUserIdOrderAsync.pending, (state, action) => {
                state.loadingGetOrderByUserId = true;
            })
            .addCase(getAllByUserIdOrderAsync.fulfilled, (state, action) => {
                state.loadingGetOrderByUserId = false;
                state.orderUser = action.payload;
            })
            .addCase(getAllByUserIdOrderAsync.rejected, (state, action) => {
                state.loadingGetOrderByUserId = false;
            })
            .addCase(getDetailOrderAsync.pending, (state, action) => {
                state.loadingDetailOrder = true;
            })
            .addCase(getDetailOrderAsync.fulfilled, (state, action) => {
                state.loadingDetailOrder = false;
                state.detailOrder = action.payload;
            })
            .addCase(getDetailOrderAsync.rejected, (state, action) => {
                state.loadingDetailOrder = false;
            })
            .addCase(assignRepairAsync.pending, (state, action) => {
                state.loadingAssignOrder = true;
            })
            .addCase(assignRepairAsync.fulfilled, (state, action) => {
                state.loadingAssignOrder = false;
            })
            .addCase(assignRepairAsync.rejected, (state, action) => {
                state.loadingAssignOrder = false;
            });
    },
});
export default orderSlice.reducer;
export const { clearListOrder, clearListOrderByUser } = orderSlice.actions;
