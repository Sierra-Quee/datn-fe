import { IOrder, IDetailOrder, IOrderMedia } from "../../utils/model";
import fetchHandler from "../axios";

export interface IGetAllOrderQuery {
    limit?: number;
    page?: number;
    repairmanId?: string;
    status?: number;
    to?: string;
    from?: string;
}
export const getAllOrderApi = (query: IGetAllOrderQuery) => {
    return fetchHandler.get(`/order/getAll${query}`);
};

export const getAllOrderByUserIdApi = (userId: string, status?: number) => {
    return fetchHandler.get(`/order/getAllByUserId/${userId}?status=${status}`);
};

export const createOrderApi = (order: IOrder) => {
    return fetchHandler.post("/order/createOrder", order);
};

export const getOrderByIdApi = (orderId: number | string) => {
    return fetchHandler.get(`/order/${orderId}`);
};

// TO DO
