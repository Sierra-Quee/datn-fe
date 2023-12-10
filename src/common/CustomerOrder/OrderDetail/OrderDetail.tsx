import {
    Button,
    Divider,
    Empty,
    Flex,
    Layout,
    Space,
    Spin,
    Steps,
    theme,
    Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IOrder } from "../../../utils/model";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { clearOrder, getOrderByIdAsync } from "../../../core/reducers/order";
import { formatOrderStatusName } from "../../../utils/functions/formation";
import "./OrderDetail.scss";
import {
    LoadingOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;
type Props = {};

const OrderDetail = (props: Props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { orderId } = useParams();
    const dispatch = useAppDispatch();
    const [orderData, setOrderData] = useState<IOrder>();
    const { order, loadingOrder } = useAppSelector((state) => state.order);
    const handleGetOrder = async () => {
        if (orderId) await dispatch(getOrderByIdAsync(parseInt(orderId)));
    };
    useEffect(() => {
        handleGetOrder();

        return () => {
            dispatch(clearOrder);
        };
    }, [orderId]);

    useEffect(() => {
        if (order) {
            setOrderData(order);
        }
    }, [order]);

    return (
        <Spin spinning={loadingOrder}>
            <Layout
                style={{
                    padding: "24px 0",
                    width: "80%",
                    margin: "auto",
                    borderRadius: "5px",
                    minHeight: "80vh",
                }}
                className="orderDetailLayout"
            >
                {orderData ? (
                    <>
                        <Flex
                            className="orderStatus"
                            justify="flex-end"
                            align="center"
                            gap={10}
                        >
                            <Title level={5}>
                                MÃ ĐƠN ĐẶT DỊCH VỤ: {orderData?.code}
                            </Title>
                            <Title level={5} type="success">
                                TRẠNG THÁI:{" "}
                                {formatOrderStatusName(orderData.status)}
                            </Title>
                        </Flex>
                        <Flex className="orderProgress" vertical gap={20}>
                            <Steps
                                items={[
                                    {
                                        title: "Tìm thợ",
                                        status: "finish",
                                        icon: <UserOutlined />,
                                    },
                                    {
                                        title: "Giao thợ",
                                        status: "finish",
                                        icon: <SolutionOutlined />,
                                    },
                                    {
                                        title: "Tiến hành sửa chữa",
                                        status: "process",
                                        icon: <LoadingOutlined />,
                                    },
                                    {
                                        title: "Hoàn thành",
                                        status: "wait",
                                        icon: <SmileOutlined />,
                                    },
                                ]}
                            />
                            <Flex justify="flex-end" style={{ width: "100%" }}>
                                <Space
                                    direction="vertical"
                                    style={{ width: "30%" }}
                                >
                                    <Text>
                                        Ngày dự kiến thực hiện dịch vụ:{" "}
                                        {order.expectedDate}
                                    </Text>
                                    <Button>Hủy đơn</Button>
                                    <Button>Lấy mã QR</Button>
                                </Space>
                            </Flex>
                        </Flex>
                        <Flex>
                            <Title level={5}>ĐỊA CHỈ ĐẶT DỊCH VỤ</Title>
                            <Text>{orderData.address?.address}</Text>
                        </Flex>
                    </>
                ) : (
                    <Empty />
                )}
            </Layout>
        </Spin>
    );
};

export default OrderDetail;
