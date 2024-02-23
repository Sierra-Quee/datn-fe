import { OrderStatus } from "../../utils/constants";
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
    return fetchHandler.get(
        `/order/getAll?${
            query.status !== undefined && query.status in OrderStatus
                ? `status=${query.status}`
                : ""
        }${
            query.from && query.from.length > 0
                ? `&from=${new Date(query.from).toISOString()}`
                : ""
        }${
            query.to && query.to.length > 0
                ? `&to=${new Date(query.to).toISOString()}`
                : ""
        }`
    );
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

export const getOrderQrTokenApi = (orderId: number | string) => {
    return fetchHandler.get(`/order/generateQrInfo/${orderId}`);
};

export const cancelOrderApi = (canceledOrder: any) => {
    return fetchHandler.patch("/order/cancelOrder", canceledOrder);
};

export const assignOrderApi = (query: {
    orderId: string;
    repairmanId: string;
}) => {
    return fetchHandler.patch(
        `/order/assignOrder?orderId=${query.orderId}&repairmanId=${query.repairmanId}`
    );
};

export const getStatisticApi = (query: {
    from: string;
    to: string;
    type: string;
}) => {
    return fetchHandler.post(
        `/order/statistic?from=${query.from}&to=${query.to}&type=${query.type}`
    );
};

export const getDailyStatisticApi = () => {
    return fetchHandler.post("/order/dailyStatistic");
};
