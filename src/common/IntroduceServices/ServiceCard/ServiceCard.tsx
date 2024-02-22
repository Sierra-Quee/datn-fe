import React from "react";
import { ICartItem, IService } from "../../../utils/model";
import { Button, Card, Flex, Rate, message } from "antd";
import Images from "../../../assets/Images";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { createCartItemAsync, getCartAsync } from "../../../core/reducers/cart";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../../utils/functions/formation";

type Props = {
    service: IService;
};

const ServiceCard = ({ service }: Props) => {
    const { skillId } = useParams();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();
    const { cartId, cartItemList } = useAppSelector((state) => state.cart);
    const handleAddServiceToCard = async () => {
        if (
            cartItemList.some(
                (item) => item.service.serviceId === service.serviceId
            )
        ) {
            messageApi.warning("Dịch vụ đã có trong giỏ hàng");
            return;
        }
        const cartItem: ICartItem = {
            cartId,
            serviceId: service.serviceId,
            isChoosen: false,
        };
        await dispatch(createCartItemAsync(cartItem));
        await dispatch(getCartAsync());
        messageApi.success("Thêm dịch vụ vào giỏ hàng thành công");
    };
    return (
        <>
            {contextHolder}
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
                <div
                    className="card-title"
                    onClick={() =>
                        navigate(
                            `/introduce-services/${service.skillId}/${service.serviceId}`
                        )
                    }
                >
                    {service?.name}
                </div>
                <div
                    className="card-value"
                    onClick={() =>
                        navigate(
                            `/introduce-services/${skillId}/${service.serviceId}`
                        )
                    }
                >
                    <div style={{ marginBottom: 5 }}>
                        Giá:{" "}
                        <span
                            style={{
                                fontWeight: 600,
                            }}
                        >
                            {formatCurrency(service.price || 0)}
                        </span>
                    </div>
                    {service.rate ? (
                        <Rate value={service.rate} disabled />
                    ) : (
                        <div>Không có đánh giá</div>
                    )}
                </div>
                <Flex gap={10}>
                    <Button onClick={handleAddServiceToCard}>Thêm</Button>
                    <Button
                        type="primary"
                        onClick={() =>
                            navigate(
                                `/introduce-services/${service.skillId}/${service.serviceId}`
                            )
                        }
                        style={{ background: "#435585" }}
                    >
                        Xem
                    </Button>
                </Flex>
            </Card>
        </>
    );
};

export default ServiceCard;
