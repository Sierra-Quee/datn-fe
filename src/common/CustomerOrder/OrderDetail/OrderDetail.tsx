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
    Input,
    Select,
    Result,
    notification,
} from "antd";
import type { NotificationArgsProps } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { IComponent, IOrder, ITypeService } from "../../../utils/model";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
    assignOrderAsync,
    clearOrder,
    getOrderByIdAsync,
    getQrTokenAsync,
} from "../../../core/reducers/order";
import {
    formatCurrency,
    formatDate,
    formatOrderStatusName,
    formatOrderStatusProgress,
} from "../../../utils/functions/formation";
import "./OrderDetail.scss";
import {
    LoadingOutlined,
    PoundOutlined,
    QrcodeOutlined,
    SmileOutlined,
    SolutionOutlined,
    ToolOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { OrderStatus } from "../../../utils/constants";
import { ColumnsType } from "antd/es/table";
import { Role } from "../../../core/auth/roles";
import { getAllUserRoleAsync } from "../../../core/reducers/users";
import fetchHandler from "../../../api/axios";
const { Title, Text } = Typography;
const { TextArea } = Input;
type Props = {};
type ProgressItem = "wait" | "process" | "finish" | "error" | undefined;
type NotificationPlacement = NotificationArgsProps["placement"];
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
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: `Notification ${placement}`,
            description: "Thợ sửa chữa check in đơn thành công",
            placement,
        });
    };
    const { orderId } = useParams();
    const dispatch = useAppDispatch();
    const [orderData, setOrderData] = useState<IOrder>();
    const [openQrModal, setOpenQrModal] = useState<boolean>(false);
    const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
    const [cancelOrderReason, setCancelOrderReason] = useState<string>("");
    const [progressItems, setProgressItems] = useState<ProgressItem[]>(
        new Array(5).fill("wait")
    );
    const [selectedRepairman, setSelectedRepairman] = useState<string | null>(
        null
    );
    const { order, loadingOrder, qrToken, isGettingQrToken } = useAppSelector(
        (state) => state.order
    );
    const { repairList, user } = useAppSelector((state) => state.users);
    const { account } = useAppSelector((state) => state.authentication);
    const handleGetOrder = async () => {
        if (orderId) await dispatch(getOrderByIdAsync(parseInt(orderId)));
    };
    const handleGetAllRepairList = useCallback(async () => {
        await dispatch(getAllUserRoleAsync(Role.ROLE_REPAIRMAN));
    }, []);

    useEffect(() => {
        if (
            account.role === Role.ROLE_ADMIN ||
            account.role === Role.ROLE_REPAIRMAN
        ) {
            handleGetAllRepairList();
        }
    }, [account]);

    useEffect(() => {
        handleGetOrder();
        const getOrderInterval = setInterval(() => {
            handleGetOrder();
        }, 5000);
        return () => {
            dispatch(clearOrder);
            clearInterval(getOrderInterval);
        };
    }, [orderId]);

    // useEffect(() => {
    //     if (orderData?.status === OrderStatus.CHECKEDIN) {
    //         openNotification("top");
    //         setOpenQrModal(false);
    //     }
    // }, [orderData]);

    useEffect(() => {
        if (order) {
            if (
                order.status === OrderStatus.CHECKEDIN &&
                order.status !== orderData?.status
            ) {
                openNotification("top");
                setOpenQrModal(false);
            }
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

            setProgressItems([
                pendingStatus,
                acceptedStatus,
                implementingStatus,
                completeStatus,
            ]);
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
    };

    const handleOpenCancelOrderModal = () => {
        setOpenCancelModal(true);
    };

    const handleCloseCancelOrderModal = () => {
        setOpenCancelModal(false);
    };

    const handleCancelOrder = async () => {
        try {
            if (orderData && orderData.orderId) {
                const prefix =
                    account.role === Role.ROLE_USER
                        ? "Hủy bởi khách hàng: "
                        : "Hủy bởi nhân viên: ";
                const body = {
                    reason: prefix + cancelOrderReason,
                    orderId: parseInt(orderData.orderId.toString()),
                };
                await fetchHandler.patch("order/cancelOrder", body);
                toast.success("Hủy đơn dịch vụ thành công");
                setOpenCancelModal(false);
                handleGetOrder();
            }
        } catch (error) {
            toast.error("Hủy đơn không thành công");
        }
    };

    const handleChangeOrderReason = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCancelOrderReason(e.target.value);
    };

    const handleAssignOrder = async () => {
        if (orderData?.orderId && selectedRepairman !== null) {
            console.log("assign");
            await dispatch(
                assignOrderAsync({
                    orderId: orderData.orderId.toString(),
                    repairmanId: selectedRepairman,
                })
            );

            handleGetOrder();
        }
    };
    const serviceTotal = useMemo(() => {
        let total = 0;
        if (orderData) {
            orderData.orderDetails?.forEach((detail) => {
                if (detail.service?.type === ITypeService.MainTain) {
                    if (detail.service.price)
                        total += parseInt(detail.service.price.toString());
                }

                if (detail.service?.type === ITypeService.Repair) {
                    const sum = detail.diagnosis?.reduce((s, val) => {
                        return (s += parseInt(
                            val.malfunction.price.toString()
                        ));
                    }, 0);

                    if (sum && Number.isInteger(sum)) total += sum;
                }
            });
        }

        return total;
    }, [orderData]);
    const componentsTotal = useMemo(() => {
        let total = 0;
        if (orderData) {
            let sum = orderData.components?.reduce((s, cpn) => {
                return s + cpn.pricePerUnit * cpn.quantity;
            }, 0);

            if (sum && Number.isInteger(sum)) total += sum;
        }

        return total;
    }, [orderData]);
    return (
        <Spin spinning={loadingOrder && orderData === undefined}>
            {contextHolder}
            <Layout
                style={{
                    padding: "24px 0",
                    width: "80%",
                    margin: "30px auto",
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
                                items={
                                    orderData.status === OrderStatus.REJECTED
                                        ? [
                                              {
                                                  title: "Tìm thợ",
                                                  status: "finish",
                                                  icon: <UserOutlined />,
                                              },
                                              {
                                                  title: "Hủy đơn",
                                                  status: "finish",
                                                  icon: <UserOutlined />,
                                              },
                                          ]
                                        : [
                                              {
                                                  title: "Tìm thợ",
                                                  status: progressItems[0],
                                                  icon:
                                                      progressItems[0] ===
                                                      "process" ? (
                                                          <LoadingOutlined />
                                                      ) : (
                                                          <UserOutlined />
                                                      ),
                                              },
                                              {
                                                  title: "Giao thợ",
                                                  status: progressItems[1],
                                                  icon:
                                                      progressItems[1] ===
                                                      "process" ? (
                                                          <LoadingOutlined />
                                                      ) : (
                                                          <SolutionOutlined />
                                                      ),
                                              },
                                              {
                                                  title: "Tiến hành sửa chữa",
                                                  status: progressItems[2],
                                                  icon:
                                                      progressItems[2] ===
                                                      "process" ? (
                                                          <LoadingOutlined />
                                                      ) : (
                                                          <ToolOutlined />
                                                      ),
                                              },
                                              {
                                                  title: "Hoàn thành",
                                                  status: progressItems[3],
                                                  icon: <SmileOutlined />,
                                              },
                                          ]
                                }
                            />
                            <Flex
                                justify="space-between"
                                style={{ width: "100%" }}
                            >
                                {account &&
                                (account.role === Role.ROLE_ADMIN ||
                                    account.role === Role.ROLE_STAFF) ? (
                                    <Space direction="vertical">
                                        <Text>
                                            Khách hàng: {order.user?.lastName}{" "}
                                            {order.user?.firstName}
                                        </Text>
                                        <Text>
                                            Số điện thoại: {order.user?.phone}
                                        </Text>
                                        <Text>
                                            Địa chỉ email: {order.user?.email}
                                        </Text>
                                        <Text>
                                            Tài khoản: {order.user?.accountName}
                                        </Text>
                                        <Text>
                                            Mã khách hàng: {order.user?.userId}
                                        </Text>
                                    </Space>
                                ) : null}
                                <Space
                                    direction="vertical"
                                    style={{ width: "30%" }}
                                >
                                    <Text>
                                        Ngày thực hiện:{" "}
                                        {formatDate(order.expectedDate)}
                                    </Text>
                                    <Button
                                        onClick={handleOpenCancelOrderModal}
                                        disabled={
                                            orderData.status !==
                                            OrderStatus.PENDING
                                        }
                                        type="primary"
                                        style={{ background: "#435585" }}
                                    >
                                        Hủy đơn
                                    </Button>
                                    {account &&
                                        account.role === Role.ROLE_USER && (
                                            <Button
                                                onClick={handleOpenQrModal}
                                                disabled={
                                                    orderData.status !==
                                                    OrderStatus.ACCEPTED
                                                }
                                                icon={<QrcodeOutlined />}
                                                type="primary"
                                                style={{
                                                    background: "#435585",
                                                }}
                                            >
                                                Lấy mã QR
                                            </Button>
                                        )}
                                    {(account.role === Role.ROLE_ADMIN ||
                                        account.role === Role.ROLE_STAFF) && (
                                        <Flex vertical>
                                            <Select
                                                showSearch
                                                filterOption={(input, option) =>
                                                    (
                                                        option?.label ?? ""
                                                    ).includes(input)
                                                }
                                                options={
                                                    Array.isArray(repairList) &&
                                                    repairList.length > 0
                                                        ? repairList.map(
                                                              (rp) => {
                                                                  return {
                                                                      value: rp.userId,
                                                                      label: rp.accountName,
                                                                  };
                                                              }
                                                          )
                                                        : []
                                                }
                                                onChange={(val) =>
                                                    setSelectedRepairman(val)
                                                }
                                                disabled={
                                                    orderData.repairman !== null
                                                }
                                            />
                                            <Button
                                                type="primary"
                                                style={{
                                                    background: "#435585",
                                                }}
                                                onClick={handleAssignOrder}
                                                disabled={
                                                    orderData.repairman !== null
                                                }
                                            >
                                                Giao thợ sửa chữa
                                            </Button>
                                        </Flex>
                                    )}
                                </Space>
                            </Flex>
                        </Flex>
                        <Flex vertical className="orderInfo">
                            <Flex vertical>
                                <Title level={5}>ĐỊA CHỈ ĐẶT DỊCH VỤ</Title>
                                <Text>{orderData.address?.address}</Text>
                            </Flex>
                            {((orderData.status !== undefined &&
                                orderData.status >= OrderStatus.ACCEPTED) ||
                                (order.repairman &&
                                    account.role === Role.ROLE_ADMIN) ||
                                account.role === Role.ROLE_STAFF) && (
                                <Flex vertical>
                                    <Title level={5}>THỢ SỬA CHỮA</Title>
                                    <Text>
                                        Họ và tên thợ sửa chữa:{" "}
                                        {orderData.repairman?.lastName}{" "}
                                        {orderData.repairman?.firstName}
                                    </Text>
                                    <Text copyable>
                                        Số điện thoại:{" "}
                                        {orderData.repairman?.phone}
                                    </Text>
                                    <Text copyable>
                                        Địa chỉ email:{" "}
                                        {orderData.repairman?.email}
                                    </Text>
                                </Flex>
                            )}

                            <Flex vertical>
                                <Title level={5}>DỊCH VỤ</Title>
                                <Flex vertical>
                                    {orderData.orderDetails?.map(
                                        (orderDetail) => (
                                            <>
                                                <Flex
                                                    key={
                                                        orderDetail.orderDetailId
                                                    }
                                                    vertical
                                                >
                                                    <Text
                                                        style={{
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        {
                                                            orderDetail?.service
                                                                ?.name
                                                        }
                                                    </Text>
                                                    {orderData.status !==
                                                        undefined &&
                                                        orderData.status >
                                                            OrderStatus.ACCEPTED && (
                                                            <Space
                                                                style={{
                                                                    padding:
                                                                        "0 50px",
                                                                }}
                                                                direction="vertical"
                                                            >
                                                                {Array.isArray(
                                                                    orderDetail.diagnosis
                                                                ) &&
                                                                    orderDetail.diagnosis.map(
                                                                        (
                                                                            dia
                                                                        ) => (
                                                                            <Flex
                                                                                justify="space-between"
                                                                                gap={
                                                                                    200
                                                                                }
                                                                            >
                                                                                <Text>
                                                                                    {
                                                                                        dia
                                                                                            .malfunction
                                                                                            .name
                                                                                    }
                                                                                </Text>
                                                                                <Text
                                                                                    style={{
                                                                                        color: "red",
                                                                                    }}
                                                                                >
                                                                                    Giá:
                                                                                    {formatCurrency(
                                                                                        parseInt(
                                                                                            dia.malfunction.price.toString()
                                                                                        )
                                                                                    )}
                                                                                </Text>
                                                                            </Flex>
                                                                        )
                                                                    )}
                                                            </Space>
                                                        )}
                                                </Flex>
                                                <Divider
                                                    style={{
                                                        padding: 0,
                                                        margin: 10,
                                                    }}
                                                />
                                            </>
                                        )
                                    )}
                                </Flex>
                            </Flex>
                            {orderData.status === OrderStatus.COMPLETE && (
                                <Flex vertical>
                                    <Title level={5}>DANH SÁCH LINH KIỆN</Title>
                                    <Table
                                        columns={columns}
                                        dataSource={orderData.components}
                                    />
                                </Flex>
                            )}
                            {orderData.status === OrderStatus.COMPLETE && (
                                <Flex vertical align="end" gap={10}>
                                    <Text>
                                        Phát xin chí phí:{" "}
                                        {orderData.inccuredCostReason}
                                    </Text>
                                    <Flex
                                        style={{ width: "30%" }}
                                        justify="space-between"
                                    >
                                        <Title level={5} style={{ margin: 0 }}>
                                            CHI PHI PHÁT SINH:
                                        </Title>
                                        <Text>
                                            {orderData.inccuredCost
                                                ? formatCurrency(
                                                      orderData.inccuredCost
                                                  )
                                                : formatCurrency(0)}
                                        </Text>
                                    </Flex>
                                    <Flex
                                        style={{ width: "30%" }}
                                        justify="space-between"
                                    >
                                        <Title level={5} style={{ margin: 0 }}>
                                            TỔNG PHÍ DỊCH VỤ:
                                        </Title>
                                        <Text>
                                            {formatCurrency(serviceTotal)}
                                        </Text>
                                    </Flex>
                                    <Flex
                                        style={{ width: "30%" }}
                                        justify="space-between"
                                    >
                                        <Title level={5} style={{ margin: 0 }}>
                                            TỔNG PHÍ LINH KIỆN:
                                        </Title>
                                        <Text>
                                            {formatCurrency(componentsTotal)}
                                        </Text>
                                    </Flex>
                                    <Flex
                                        style={{ width: "30%" }}
                                        justify="space-between"
                                    >
                                        <Title level={5} style={{ margin: 0 }}>
                                            TỔNG TIỀN:
                                        </Title>
                                        <Text>
                                            {formatCurrency(
                                                orderData.inccuredCost
                                                    ? orderData.inccuredCost +
                                                          serviceTotal +
                                                          componentsTotal
                                                    : serviceTotal +
                                                          componentsTotal
                                            )}
                                        </Text>
                                    </Flex>
                                </Flex>
                            )}
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
                <Title level={4}>Nhập lý do hủy đơn</Title>
                <TextArea
                    showCount
                    maxLength={100}
                    onChange={handleChangeOrderReason}
                    placeholder="Hãy miêu tả lỗi mà thiết bị của bạn gặp phải"
                    style={{ height: 120, resize: "none" }}
                    value={cancelOrderReason}
                />
            </Modal>
        </Spin>
    );
};

export default OrderDetail;
