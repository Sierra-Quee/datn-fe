import { IMalfunction } from "../../utils/model";
import fetchHandler from "../axios";

export const getAllMalfunction = () => {
    return fetchHandler.get(`/malfunction/getAll`);
};
export const createMalfunction = (body: IMalfunction) => {
    return fetchHandler.post(`/malfunction/createMalfunction`, body);
};
export const updateMalfunction = () => {
    return fetchHandler.get(`/malfunction/updateMalfunction`);
};
export const createMultiMalfunctionAPI = (body: IMalfunction[]) => {
    return fetchHandler.post(`/malfunction/createMultiMalfunction`, body);
};
