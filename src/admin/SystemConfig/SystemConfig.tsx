import React, { useCallback, useEffect, useState } from "react";
import "./SystemConfig.scss";
import {
    Button,
    Flex,
    Form,
    Input,
    Modal,
    Select,
    Spin,
    Typography,
} from "antd";
import { IAddress, IOrder, ISystemConfig, IUser } from "../../utils/model";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
    getSystemConfigAsync,
    updateSystemConfigAsync,
} from "../../core/reducers/system-config";
import { Role } from "../../core/auth/roles";
import {
    generateRandomAccountList,
    generateRandomOrders,
    generateRandomSkillForRepairman,
    getRandomAddress,
} from "../../utils/functions/randomAccount";
import {
    clearListRepair,
    createMultiUserAsync,
    getAllUserRoleAsync,
} from "../../core/reducers/users";
import fetchHandler from "../../api/axios";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "./SystemConfig.scss";
import "leaflet/dist/leaflet.css";
import RepairmanMarker from "../../common/Map/RepairmanMarker";
import { IGetAllOrderQuery } from "../../api/order/orderApi";
import order, {
    clearOrderList,
    getAllOrderAsync,
} from "../../core/reducers/order";
import { OrderStatus } from "../../utils/constants";
import OrderMarker from "../../common/Map/OrderMarker";
const { Title } = Typography;
const { Option } = Select;
type Props = {};
type RandomAccConfig = {
    amount: number;
    role: Role;
};

const SystemConfig = (props: Props) => {
    const position: LatLngExpression = [21.005208714308612, 105.84382688007868];
    const [repairmanList, setRepairmanList] = useState<IUser[]>([]);
    const [orderPendingList, setOrderPendingList] = useState<IOrder[]>([]);
    const formItemLayout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };
    const buttonItemLayout = { wrapperCol: { span: 14, offset: 14 } };
    const [configValue, setConfigValue] = useState<ISystemConfig>();
    const [accAmount, setAccAmount] = useState<number>(5);
    const [selectedRole, setSelectedRole] = useState<Role>(Role.ROLE_USER);
    const [creatingRandomAcc, setCreatingRandomAcc] = useState<boolean>(false);
    const [openMap, setOpenMap] = useState<boolean>(false);
    const [intervalSyncOrder, setIntervalSyncOrder] = useState<number>(10000);
    const dispatch = useAppDispatch();
    const { config, isLoadingSystemConfig, updateSystemConfig } =
        useAppSelector((state) => state.systemConfig);
    const { repairList, user } = useAppSelector((state) => state.users);
    const { orderList, loadingOrderList } = useAppSelector(
        (state) => state.orders
    );
    const handleGetSystemConfig = async () => {
        await dispatch(getSystemConfigAsync());
    };
    const handleGetAllRepairList = useCallback(async () => {
        await dispatch(getAllUserRoleAsync(Role.ROLE_REPAIRMAN));
    }, []);
    const handleGetAllOrder = useCallback(async (query: IGetAllOrderQuery) => {
        await dispatch(getAllOrderAsync(query));
    }, []);
    useEffect(() => {
        handleGetAllRepairList();
        handleGetSystemConfig();
        return () => {
            dispatch(clearListRepair());
        };
    }, []);

    useEffect(() => {
        if (config) {
            setConfigValue(config);
            // setIntervalSyncOrder(config.assignOrderInterval);
        }
    }, [config]);

    useEffect(() => {
        if (Array.isArray(repairList) && repairList.length > 0) {
            setRepairmanList(repairList);
        }
    }, [repairList]);

    useEffect(() => {
        const query: IGetAllOrderQuery = {
            status: OrderStatus.PENDING,
            type: "config",
        };
        handleGetAllOrder(query);
        const getOrderInterval = setInterval(() => {
            handleGetAllOrder(query);
        }, intervalSyncOrder);
        return () => {
            dispatch(clearOrderList);
            clearInterval(getOrderInterval);
        };
    }, [intervalSyncOrder]);

    useEffect(() => {
        if (Array.isArray(orderList) && orderList.length > 0) {
            setOrderPendingList(orderList);
        }
    }, [orderList]);
    console.log({ orderPendingList });
    const handleValueChange = (value: ISystemConfig) => {
        setConfigValue({ ...configValue, ...value });
    };

    const handleRandomAccChange = (value: RandomAccConfig) => {
        const val = value.amount ? parseInt(value.amount.toString()) : 0;
        if (val > 0 && val <= 50) {
            setAccAmount(val);
        }
    };

    const handleSubmitAccList = async () => {
        const list = generateRandomAccountList(selectedRole, accAmount);
        try {
            setCreatingRandomAcc(true);
            const response = await fetchHandler.post(
                "user/createMultiUser",
                list
            );
            const { userIdList } = response.data;
            const addressList = getRandomAddress(userIdList, selectedRole);
            const res = await fetchHandler.post(
                "address/createMultiAddress",
                addressList
            );
            const { addressIdList } = res.data;
            if (selectedRole === Role.ROLE_REPAIRMAN) {
                const skillRes = await fetchHandler.get("skill/getAll");
                const skillList = skillRes.data;
                if (!Array.isArray(skillList) || skillList.length === 0) {
                    toast.warn("Không thể tạo thợ");
                    return;
                }
                const skillIdList = skillList.map((skill) => skill.skillId);
                const repairmansSkillList = generateRandomSkillForRepairman(
                    userIdList,
                    skillIdList
                );
                try {
                    await fetchHandler.post(
                        "skill/updateRepairmanSkill",
                        repairmansSkillList
                    );
                    toast.success(
                        `Tạo ngẫu nhiên ${accAmount} tài khoản thợ sửa chữa thành công`
                    );
                    handleGetAllRepairList();
                } catch (error) {
                    toast.error("Không thể thêm kỹ năng cho thợ");
                    setCreatingRandomAcc(false);
                }
            }
            if (selectedRole === Role.ROLE_USER) {
                const servicesRes = await fetchHandler.get("service/getAll");
                const serviceList = servicesRes.data;
                if (!Array.isArray(serviceList) || serviceList.length === 0) {
                    toast.warn("Không thể tạo đơn");
                    return;
                }
                const serviceIdList = serviceList.map(
                    (service) => service.serviceId
                );
                const orderList = generateRandomOrders(
                    userIdList,
                    addressIdList,
                    serviceIdList
                );

                if (Array.isArray(orderList) && orderList.length > 0) {
                    await fetchHandler.post(
                        "order/createMultiOrder",
                        orderList
                    );
                }

                toast.success(
                    `Tạo ngẫu nhiên ${accAmount} tài khoản khách hàng thành công`
                );
                toast.success(
                    `Tạo ngẫu nhiên ${accAmount} đơn hàng hàng thành công`
                );
            }
            setCreatingRandomAcc(false);
        } catch (error) {
            setCreatingRandomAcc(false);
            toast.error("Không thành công");
        }
    };

    const handleSubmit = async () => {
        if (configValue) {
            const data: ISystemConfig = {
                id: configValue.id,
                switchRepairmanStatusPeriod: parseInt(
                    configValue.switchRepairmanStatusPeriod.toString()
                ),
                distanceToAssignOrder: parseInt(
                    configValue.distanceToAssignOrder.toString()
                ),
                assignOrderInterval: parseInt(
                    configValue.assignOrderInterval.toString()
                ),
            };

            await dispatch(updateSystemConfigAsync(data));
        }
    };
    return (
        <>
            {!openMap && (
                <Spin
                    spinning={
                        isLoadingSystemConfig ||
                        updateSystemConfig.updatingSystemConfig ||
                        creatingRandomAcc
                    }
                >
                    <Flex style={{ width: "100%" }} vertical align="center">
                        <Title level={3}>Cấu hình hệ thống</Title>
                        {config && (
                            <Form
                                {...formItemLayout}
                                style={{ width: "75%" }}
                                initialValues={config}
                                onValuesChange={handleValueChange}
                            >
                                <Form.Item<ISystemConfig>
                                    label="Thời gian tự động xếp đơn (phút)"
                                    name="assignOrderInterval"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Nhập khoảng thời gian tự động xếp đơn",
                                        },
                                    ]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item<ISystemConfig>
                                    label="Bán kính quét đơn (km)"
                                    name="distanceToAssignOrder"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nhập  bán kính quét đơn",
                                        },
                                    ]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item<ISystemConfig>
                                    label="Khoảng thời gian thay đổi trạng thái thợ sửa chữa (phút)"
                                    name="switchRepairmanStatusPeriod"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Nhập khoảng thời gian thay đổi trạng thái thợ sửa chữa",
                                        },
                                    ]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item {...buttonItemLayout}>
                                    <Button
                                        type="primary"
                                        style={{
                                            width: "200px",
                                            margin: 0,
                                            background: "#435585",
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </Form>
                        )}

                        <Form
                            {...formItemLayout}
                            style={{ width: "75%" }}
                            onValuesChange={handleRandomAccChange}
                        >
                            <Form.Item<RandomAccConfig>
                                label="Số tài khoản"
                                name="amount"
                                rules={[
                                    {
                                        required: true,
                                        message: "Nhập số tài khoản",
                                    },
                                ]}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                label="Vai trò"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Hãy chọn vai trò!",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn vai trò"
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e)}
                                >
                                    <Option value={Role.ROLE_USER}>
                                        Khách hàng
                                    </Option>
                                    <Option value={Role.ROLE_REPAIRMAN}>
                                        Thợ sửa chưaX
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item {...buttonItemLayout}>
                                <Button
                                    type="primary"
                                    style={{
                                        width: "200px",
                                        margin: 0,
                                        background: "#435585",
                                    }}
                                    onClick={handleSubmitAccList}
                                >
                                    Tạo ngẫu nhiên
                                </Button>
                            </Form.Item>
                            <Form.Item {...buttonItemLayout}>
                                <Button
                                    type="primary"
                                    style={{
                                        width: "200px",
                                        margin: 0,
                                        background: "#435585",
                                    }}
                                    onClick={() => setOpenMap(true)}
                                >
                                    Mô phỏng bản đồ
                                </Button>
                            </Form.Item>
                        </Form>
                    </Flex>
                    {/* <Button type="primary" onClick={() => setOpenMap(true)}>
                        Open Map
                    </Button> */}
                </Spin>
            )}
            {openMap && (
                <Flex
                    style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                    }}
                    vertical
                >
                    <MapContainer center={position} zoom={13} scrollWheelZoom>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {Array.isArray(repairmanList) &&
                            repairmanList.length > 0 &&
                            repairmanList.map((repairman) => (
                                <RepairmanMarker repairman={repairman} />
                            ))}
                        {Array.isArray(orderPendingList) &&
                            orderPendingList.length > 0 &&
                            orderPendingList.map((order) => (
                                <OrderMarker order={order} />
                            ))}
                    </MapContainer>
                    <Button type="primary" onClick={() => setOpenMap(false)}>
                        Tắt mô phỏng bản đồ
                    </Button>
                </Flex>
            )}
        </>
    );
};

export default SystemConfig;
