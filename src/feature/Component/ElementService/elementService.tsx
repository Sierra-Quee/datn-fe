import { Button, Modal, Rate } from "antd";
import { useState } from "react";

interface IServiceDV {
    img: string;
    cost: number;
    vote: string;
    title: string;
    info: string;
}
interface IServiceProps {
    nameService: IServiceDV;
}
export const Service = (props: IServiceProps) => {
    const { nameService } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClickChoose = () => {
        setIsModalOpen(true);
    };

    const handleClickOk = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <img alt={nameService.title} src={nameService.img}></img>
            <a href="https://ant.design/index-cn">{nameService.title} </a>
            <div>{nameService.cost} đ</div>
            <Rate allowHalf defaultValue={2.5} />;
            <div>
                <Button type="primary" onClick={handleClickChoose}>
                    Chọn
                </Button>
                <Modal
                    title="DATN.com.vn"
                    open={isModalOpen}
                    onOk={handleClickOk}
                >
                    <p>
                        Cảm ơn quý khác đã lựa chọn dịch vụ, vui lòng vào giỏ
                        hàng để hoàn tất đặt hàng
                    </p>
                </Modal>
                <Button type="primary" href="https://ant.design/index-cn">
                    Đặt dịch vụ
                </Button>
            </div>
        </div>
    );
};
