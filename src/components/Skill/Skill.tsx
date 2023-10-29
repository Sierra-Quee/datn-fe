import { Link } from "react-router-dom";
import { IService, ISkill } from "../../utils/model";

interface ISkillProp {
    dataSkill: ISkill;
}
export const SkillComponent = (props: ISkillProp) => {
    const { dataSkill } = props;
    return (
        <div key={dataSkill.skillId}>
            <img src={dataSkill.image} alt="Image" />
            <Link title={dataSkill.name} to="" />
            <div>{dataSkill.createdAt}</div>
        </div>
    );
};
