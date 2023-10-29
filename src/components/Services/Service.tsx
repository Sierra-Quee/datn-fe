import { IService } from "../../utils/model";

interface IServiceProp {
    dataServices: IService;
}
export const ServiceComponent = (props: IServiceProp) => {
    const { dataServices } = props;
    return (
        <div key={dataServices.serviceId}>
            <img src={dataServices.image} alt="Image" />
            <div>{dataServices.name}</div>
            <div>{dataServices.desc}</div>
        </div>
    );
};
