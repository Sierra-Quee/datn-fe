import { useEffect } from "react";

import { useAppDispatch } from "../../redux/hook";

const Home = () => {
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

export default Home;
