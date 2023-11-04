import { useEffect } from "react";
import { getAllSkillAsync, setAllSkill } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

export const Home = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // handleGetAllSkillAsync();
    }, []);
    return (
        <div>
            <h2>Home123</h2>
            {/* {Array.isArray(skill)
                ? skill.map((item) => {
                      return <SkillComponent dataSkill={item} />;
                  })
                : ""} */}
        </div>
    );
};
