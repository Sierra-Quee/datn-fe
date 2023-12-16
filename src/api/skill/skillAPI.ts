import { ISkill } from "../../utils/model";
import fetchHandler from "../axios";

export const getAllSkillAPI = () => {
    return fetchHandler.get("/skill/getAll");
};

export const createSkillAPI = (skill: ISkill) => {
    return fetchHandler.post("/skill/createSkill", skill);
};

export const getSkillByIdAPI = (id: number) => {
    return fetchHandler.get(`/skill/${id}`);
};

export const updateSkillAPI = (skill: ISkill) => {
    return fetchHandler.patch("/skill/updateSkill", skill);
};

export const updateStatusSkillAPI = (skillId: number) => {
    return fetchHandler.patch(`/skill/toggleSkillActive/${skillId}`);
};
export const createMultiSkillAPI = (body: ISkill[]) => {
    return fetchHandler.post(`/skill/createMultiSkills`, body);
};
