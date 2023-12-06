import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrder, IOrderMedia, IDetailOrder } from "../../utils/model";
import {
    getAllOrderApi,
    getOrderByIdApi,
    createOrderApi,
    getAllOrderByUserIdApi,
    IGetAllOrderQuery,
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
        orderDetail: [],
        code: "",
        status: 0,
        addressId: 0,
        expectedDate: "",
    },
    loadingOrder: false,
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
            });
    },
});

export default orderSlice.reducer;

export const { setAllOrder, clearOrderList } = orderSlice.actions;
