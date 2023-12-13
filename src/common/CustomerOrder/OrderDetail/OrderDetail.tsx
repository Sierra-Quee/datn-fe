import {
    Button,
    Divider,
    Empty,
    Flex,
    Layout,
    Modal,
    QRCode,
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
import {
    clearOrder,
    getOrderByIdAsync,
    getQrTokenAsync,
} from "../../../core/reducers/order";
import { formatOrderStatusName } from "../../../utils/functions/formation";
import "./OrderDetail.scss";
import {
    LoadingOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
const { Title, Text } = Typography;
type Props = {};

const OrderDetail = (props: Props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { orderId } = useParams();
    const dispatch = useAppDispatch();
    const [orderData, setOrderData] = useState<IOrder>();
    const [openQrModal, setOpenQrModal] = useState<boolean>(false);
    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
    const { order, loadingOrder, qrToken, isGettingQrToken } = useAppSelector(
        (state) => state.order
    );
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
    const handleOpenQrModal = async () => {
        setOpenQrModal(true);
        try {
            if (order.orderId) {
                await dispatch(getQrTokenAsync(order.orderId));
            }
        } catch (error: any) {
            toast.error("Đã có lỗi xảy ra: " + error.message);
        }
    };

    const handleCloseQrModal = () => {
        setOpenQrModal(false);
    };

    const handleDownloadQr = () => {
        const canvas = document
            .getElementById("myqrcode")
            ?.querySelector<HTMLCanvasElement>("canvas");
        if (canvas) {
            const url = canvas.toDataURL();
            const a = document.createElement("a");
            a.download = "QRCode.png";
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        // handleCloseQrModal();
    };

    const handleOpenCancelOrderModal = () => {
        setOpenCancelModal(true);
    };

    const handleCloseCancelOrderModal = () => {
        setOpenCancelModal(false);
    };

    const handleCancelOrder = async () => {};

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
                                    <Button
                                        onClick={handleOpenCancelOrderModal}
                                    >
                                        Hủy đơn
                                    </Button>
                                    <Button onClick={handleOpenQrModal}>
                                        Lấy mã QR
                                    </Button>
                                </Space>
                            </Flex>
                        </Flex>
                        <Flex vertical className="orderInfo">
                            <Flex vertical>
                                <Title level={5}>ĐỊA CHỈ ĐẶT DỊCH VỤ</Title>
                                <Text>{orderData.address?.address}</Text>
                            </Flex>
                            <Flex>
                                <Title level={5}>DỊCH VỤ</Title>
                            </Flex>
                            <Flex>
                                <Title level={5}>DANH SÁCH LINH KIỆN</Title>
                            </Flex>
                        </Flex>
                    </>
                ) : (
                    <Empty />
                )}
            </Layout>
            <Modal
                open={openQrModal}
                onCancel={handleCloseQrModal}
                onOk={handleDownloadQr}
                cancelText="Quay lại"
                okText="Tải xuống"
            >
                <Flex vertical align="center">
                    <Title level={4}>
                        Mã QR đơn đặt dịch vụ <strong>{order.code}</strong>
                    </Title>
                    <Spin spinning={isGettingQrToken}>
                        <div id="myqrcode">
                            <QRCode
                                value={qrToken}
                                bgColor="#fff"
                                style={{ marginBottom: 16 }}
                                size={300}
                            />
                        </div>
                    </Spin>
                </Flex>
            </Modal>
            <Modal
                open={openCancelModal}
                onCancel={handleCloseCancelOrderModal}
                onOk={handleCancelOrder}
                okText="Đồng ý"
                cancelText="Quay lại"
            >
                <Title level={4}>Bạn muốn hủy đơn này?</Title>
            </Modal>
        </Spin>
    );
};

export default OrderDetail;
