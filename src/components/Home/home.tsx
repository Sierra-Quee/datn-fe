import { useEffect } from "react";
import { getAllSkillAsync, setAllSkill } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { SkillComponent } from "../Skill/Skill";

export const Home = () => {
    const dispatch = useAppDispatch();
    const { skill } = useAppSelector((state) => state.skillAll);
    const handleGetAllSkillAsync = async () => {
        const res = await dispatch(getAllSkillAsync());
        dispatch(setAllSkill(res.payload?.data));
    };
    useEffect(() => {
        handleGetAllSkillAsync();
    }, []);
    return (
        <div>
            <h2>Home</h2>
            {Array.isArray(skill)
                ? skill.map((item) => {
                      return <SkillComponent dataSkill={item} />;
                  })
                : ""}
        </div>
    );
};
