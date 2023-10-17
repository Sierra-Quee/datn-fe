import { Button } from "antd";

interface IServiceDV {
    img: string;
    title: string;
    info: string;
}
interface IServiceProps {
    nameService: IServiceDV;
}
export const Service = (props: IServiceProps) => {
    const { nameService } = props;
    return (
        <div>
            <img alt={nameService.title} src={nameService.img}></img>
            <a href="https://ant.design/index-cn">{nameService.title} </a>
            <span>{nameService.info} </span>
            <Button type="primary" href="https://ant.design/index-cn">
                Xem thêm
            </Button>
        </div>
    );
};
