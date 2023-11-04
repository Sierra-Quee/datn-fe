import { ICreateService } from "../../utils/model";
import fetchHandler from "../axios";

export const getAllServiceApi = (id: number) => {
    return fetchHandler.get("/service/getServiceBySkill/${id}");
};

export const getItemServiceApi = (id: number) => {
    return fetchHandler.get("/service/getAll/${id}");
};
export const createServiceApi = (body: ICreateService) => {
    return fetchHandler.post("/service/createService", body);
};
