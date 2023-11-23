import React from "react";
import { IService } from "../../../utils/model";
import { Button, Card, Flex, Rate } from "antd";
import Images from "../../../assets/Images";

type Props = {
    service: IService;
};

const ServiceCard = ({ service }: Props) => {
    return (
        <Card
            hoverable
            style={{ width: 250 }}
            cover={
                <img
                    alt="card"
                    style={{
                        height: 250,
                        backgroundColor: "#ccc",
                    }}
                    src={service.image || Images.no_image}
                />
            }
        >
            <div className="card-title">{service?.name}</div>
            <div className="card-value">
                <div style={{ marginBottom: 5 }}>
                    Giá:{" "}
                    <span
                        style={{
                            fontWeight: 600,
                        }}
                    >
                        {service.price} đ
                    </span>
                </div>
                {service.rate ? (
                    <Rate value={service.rate} disabled />
                ) : (
                    <div>Không có đánh giá</div>
                )}
            </div>
            <Flex gap={10}>
                <Button shape="round">Chọn</Button>
                <Button shape="round" type="primary">
                    Đặt dịch vụ
                </Button>
            </Flex>
        </Card>
    );
};

export default ServiceCard;
