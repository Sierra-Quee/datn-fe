import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../../utils/model";
import {
    IGetAllOrderQuery,
    createOrderApi,
    getAllOrderApi,
    getAllOrderByUserIdApi,
    getOrderByIdApi,
    getOrderQrTokenApi,
} from "../../api/order/orderApi";

interface IOrderSlice {
    orderList: IOrder[];
    loadingOrderList: boolean;
    createOrder: {
        loadingcreateOrder: boolean;
        createOrderStatus: "success" | "failed" | "none";
    };
    order: IOrder;
    loadingOrder: boolean;
    qrToken: string;
    isGettingQrToken: boolean;
}

const initialState: IOrderSlice = {
    orderList: [],
    loadingOrderList: false,
    createOrder: {
        loadingcreateOrder: false,
        createOrderStatus: "none",
    },
    order: {
        orderId: 0,
        orderDetails: [],
        code: "",
        status: 0,
        addressId: 0,
        expectedDate: "",
    },
    loadingOrder: false,
    qrToken: "",
    isGettingQrToken: false,
};

export const getAllOrderAsync = createAsyncThunk(
    "getAllOrder",
    async (query: IGetAllOrderQuery) => {
        const response = await getAllOrderApi(query);
        return response.data;
    }
);

export const getAllOrderByUserIdAsync = createAsyncThunk(
    "getAllOrderByUserId",
    async ({ userId, status }: { userId: string; status?: number }) => {
        const response = await getAllOrderByUserIdApi(userId, status);
        return response.data;
    }
);

export const getOrderByIdAsync = createAsyncThunk(
    "getOrderById",
    async (orderId: number | string) => {
        const response = await getOrderByIdApi(orderId);
        return response.data;
    }
);

export const createOrderAsync = createAsyncThunk(
    "createOrder",
    async (order: IOrder) => {
        const response = await createOrderApi(order);
        return response.data;
    }
);

export const getQrTokenAsync = createAsyncThunk(
    "getQrToken",
    async (orderId: number | string) => {
        const response = await getOrderQrTokenApi(orderId);
        return response.data;
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
        setAllOrder: (state, action) => {
            state.orderList = action.payload;
        },
        clearOrderList: (state, action) => {
            state.orderList = [];
        },
        clearOrder: (state, action) => {
            state.order = initialState.order;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrderAsync.pending, (state, action) => {
                state.loadingOrderList = true;
            })
            .addCase(getAllOrderAsync.fulfilled, (state, action) => {
                state.loadingOrderList = false;
                state.orderList = action.payload;
            })
            .addCase(getAllOrderAsync.rejected, (state, action) => {
                state.loadingOrderList = false;
            })
            .addCase(getAllOrderByUserIdAsync.pending, (state, action) => {
                state.loadingOrderList = true;
            })
            .addCase(getAllOrderByUserIdAsync.fulfilled, (state, action) => {
                state.loadingOrderList = false;
                state.orderList = action.payload;
            })
            .addCase(getAllOrderByUserIdAsync.rejected, (state, action) => {
                state.loadingOrderList = false;
            })
            .addCase(getOrderByIdAsync.pending, (state, action) => {
                state.loadingOrder = true;
            })
            .addCase(getOrderByIdAsync.fulfilled, (state, action) => {
                state.loadingOrder = false;
                state.order = action.payload;
            })
            .addCase(getOrderByIdAsync.rejected, (state, action) => {
                state.loadingOrder = false;
            })
            .addCase(createOrderAsync.pending, (state, action) => {
                state.createOrder.loadingcreateOrder = true;
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.createOrder.loadingcreateOrder = false;
                state.createOrder.createOrderStatus = "success";
            })
            .addCase(createOrderAsync.rejected, (state, action) => {
                state.createOrder.loadingcreateOrder = false;
                state.createOrder.createOrderStatus = "failed";
            })
            .addCase(getQrTokenAsync.pending, (state, action) => {
                state.isGettingQrToken = true;
            })
            .addCase(getQrTokenAsync.fulfilled, (state, action) => {
                state.isGettingQrToken = false;
                state.qrToken = action.payload;
            })
            .addCase(getQrTokenAsync.rejected, (state, action) => {
                state.isGettingQrToken = false;
            });
    },
});

export default orderSlice.reducer;

export const { setAllOrder, clearOrderList, clearOrder } = orderSlice.actions;
