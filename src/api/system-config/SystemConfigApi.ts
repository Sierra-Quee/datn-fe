import { ISystemConfig } from "../../utils/model";
import fetchHandler from "../axios";

export const getSystemConfigApi = () => {
    return fetchHandler.get("/system-config/getAll");
};

export const updateSystemConfigApi = (dto: ISystemConfig) => {
    return fetchHandler.patch("/system-config/update", dto);
};
