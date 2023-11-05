import { ICreateService, IService } from "../../utils/model";
import fetchHandler from "../axios";

export const getAllServiceAPI = () => {
    return fetchHandler.get("/service/getAll");
};

export const createServiceAPI = (body: ICreateService) => {
    return fetchHandler.post("/service/createService", body);
};

export const updateServiceAPI = (body: IService) => {
    return fetchHandler.patch("/service/updateService", body);
};

export const deleteServiceAPI = (serviceId: string) => {
    return fetchHandler.patch(`/service/delete/${serviceId}`);
};

export const getServiceBySkillIdAPI = (skillId: number) => {
    return fetchHandler.get(`/service/getServiceBySkill/${skillId}`);
};
