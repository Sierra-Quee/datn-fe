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
    Table,
    theme,
    Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IComponent, IOrder } from "../../../utils/model";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
    clearOrder,
    getOrderByIdAsync,
    getQrTokenAsync,
} from "../../../core/reducers/order";
import {
    formatOrderStatusName,
    formatOrderStatusProgress,
} from "../../../utils/functions/formation";
import "./OrderDetail.scss";
import {
    LoadingOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { OrderStatus } from "../../../utils/constants";
import { ColumnsType } from "antd/es/table";
const { Title, Text } = Typography;
type Props = {};
type ProgressItem = "wait" | "process" | "finish" | "error" | undefined;
const columns: ColumnsType<IComponent> = [
    {
        title: "Tên linh kiện",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Thương hiệu",
        dataIndex: "brand",
        key: "brand",
    },
    {
        title: "Mẫu",
        dataIndex: "model",
        key: "model",
    },
    {
        title: "Nhà cung cấp",
        dataIndex: "supplier",
        key: "supplier",
    },
    {
        title: "Đơn vị",
        dataIndex: "unit",
        key: "unit",
    },
    {
        title: "Giá/đơn vị",
        dataIndex: "pricePerUnit",
        key: "pricePerUnit",
    },
    {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
    },
];

const components: IComponent[] = [
    {
        componentId: "12",
        name: "Ốc vít",
        quantity: 12,
        unit: "Chiếc",
        pricePerUnit: 120000,
        brand: "no brand",
        model: "no model",
        supplier: "no supplier",
        orderId: "12",
    },
    {
        componentId: "12",
        name: "Ốc vít",
        quantity: 12,
        unit: "Chiếc",
        pricePerUnit: 120000,
        brand: "no brand",
        model: "no model",
        supplier: "no supplier",
        orderId: "12",
    },
    {
        componentId: "12",
        name: "Ốc vít",
        quantity: 12,
        unit: "Chiếc",
        pricePerUnit: 120000,
        brand: "no brand",
        model: "no model",
        supplier: "no supplier",
        orderId: "12",
    },
    {
        componentId: "12",
        name: "Ốc vít",
        quantity: 12,
        unit: "Chiếc",
        pricePerUnit: 120000,
        brand: "no brand",
        model: "no model",
        supplier: "no supplier",
        orderId: "12",
    },
];
const OrderDetail = (props: Props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { orderId } = useParams();
    const dispatch = useAppDispatch();
    const [orderData, setOrderData] = useState<IOrder>();
    const [openQrModal, setOpenQrModal] = useState<boolean>(false);
    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
    const [progressItems, setProgressItems] = useState<ProgressItem[]>(
        new Array(4).fill("wait")
    );
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
            const pendingStatus = formatOrderStatusProgress(
                order.status,
                OrderStatus.PENDING
            );
            const acceptedStatus = formatOrderStatusProgress(
                order.status,
                OrderStatus.ACCEPTED
            );
            const implementingStatus = formatOrderStatusProgress(
                order.status,
                OrderStatus.CHECKEDIN
            );
            const completeStatus = formatOrderStatusProgress(
                order.status,
                OrderStatus.COMPLETE
            );

            console.log({
                pendingStatus,
                acceptedStatus,
                implementingStatus,
                completeStatus,
            });
            setProgressItems([
                pendingStatus,
                acceptedStatus,
                implementingStatus,
                completeStatus,
            ]);
        }
    }, [order]);
    console.log({ orderData });
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
                                        status: progressItems[0],
                                        icon:
                                            progressItems[0] === "process" ? (
                                                <LoadingOutlined />
                                            ) : (
                                                <UserOutlined />
                                            ),
                                    },
                                    {
                                        title: "Giao thợ",
                                        status: progressItems[1],
                                        icon:
                                            progressItems[1] === "process" ? (
                                                <LoadingOutlined />
                                            ) : (
                                                <SolutionOutlined />
                                            ),
                                    },
                                    {
                                        title: "Tiến hành sửa chữa",
                                        status: progressItems[2],
                                        icon:
                                            progressItems[2] === "process" ? (
                                                <LoadingOutlined />
                                            ) : (
                                                <LoadingOutlined />
                                            ),
                                    },
                                    {
                                        title: "Hoàn thành",
                                        status: progressItems[3],
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
                            <Flex vertical>
                                <Title level={5}>DỊCH VỤ</Title>
                                <Flex vertical>
                                    {orderData.orderDetails?.map(
                                        (orderDetail) => (
                                            <Flex
                                                key={orderDetail.orderDetailId}
                                            >
                                                <Text>
                                                    {orderDetail.service?.name}
                                                </Text>
                                            </Flex>
                                        )
                                    )}
                                </Flex>
                            </Flex>
                            <Flex vertical>
                                <Title level={5}>DANH SÁCH LINH KIỆN</Title>
                                <Table
                                    columns={columns}
                                    dataSource={components}
                                />
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
