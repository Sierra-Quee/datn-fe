import fetchHandler from "../axios";

export interface AssignRepair {
    repairmanId: number;
    orderId: number;
}
export const getAllOrder = () => {
    return fetchHandler.get(`/order/getAll`);
};
export const getAllByUserIdOrder = (id: number) => {
    return fetchHandler.get(`/order/getAllByUserId/${id}`);
};
export const getDetailOrderById = (id: number) => {
    return fetchHandler.get(`/order/${id}`);
};
export const assignRepair = (param: AssignRepair) => {
    return fetchHandler.get(
        `/order/assignOrder?repairmanId=${param.repairmanId}&orderId=${param.orderId}`
    );
};
