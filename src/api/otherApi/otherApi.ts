import { ICreateService } from "../../utils/model";
import fetchHandler from "../axios";

export const getAllServiceApi = () => {
    return fetchHandler.get("/service/getAll");
};
export const getAllSkillApi = () => {
    return fetchHandler.get("/skill/getAll");
};
export const getItemServiceApi = (id: number) => {
    return fetchHandler.get("/service/getAll/${id}");
};
export const createServiceApi = (body: ICreateService) => {
    return fetchHandler.post("/service/createService", body);
};
