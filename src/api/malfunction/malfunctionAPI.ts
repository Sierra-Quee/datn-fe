import { IMalfunction } from "../../utils/model";
import fetchHandler from "../axios";

export const getAllMalfunction = () => {
    return fetchHandler.get(`/malfunction/getAll`);
};
export const createMalfunction = (body: IMalfunction) => {
    return fetchHandler.post(`/malfunction/createMalfunction`, body);
};
export const updateMalfunction = (body: IMalfunction) => {
    return fetchHandler.patch(`/malfunction/updateMalfunction`, body);
};
export const createMultiMalfunctionAPI = (body: IMalfunction[]) => {
    return fetchHandler.post(`/malfunction/createMultiMalfunction`, body);
};
export const getMalfunctionByServiceId = (serviceId: number) => {
    return fetchHandler.get(`/malfunction/getByService/${serviceId}`);
};
