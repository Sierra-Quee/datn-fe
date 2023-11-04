import { IService } from "../../utils/model";

interface IServiceProp {
    dataServices?: IService;
    skillId: number;
}
export const ServiceComponent = (props: IServiceProp) => {
    const { dataServices, skillId } = props;
    return (
        <div key={dataServices?.serviceId}>
            <img src={dataServices?.image} alt="Image" />
            <div>{dataServices?.name}</div>
            <div>{dataServices?.desc}</div>
        </div>
    );
};
