import React, { useEffect, useState } from "react";
import "./SystemConfig.scss";
import { Button, Flex, Form, Input, Select, Spin, Typography } from "antd";
import { IAddress, ISystemConfig } from "../../utils/model";
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
import { createMultiUserAsync } from "../../core/reducers/users";
import fetchHandler from "../../api/axios";
import { toast } from "react-toastify";
const { Title } = Typography;
const { Option } = Select;
type Props = {};
type RandomAccConfig = {
    amount: number;
    role: Role;
};

const SystemConfig = (props: Props) => {
    const formItemLayout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };
    const buttonItemLayout = { wrapperCol: { span: 14, offset: 14 } };
    const [configValue, setConfigValue] = useState<ISystemConfig>();
    const [accAmount, setAccAmount] = useState<number>(5);
    const [selectedRole, setSelectedRole] = useState<Role>(Role.ROLE_USER);
    const [creatingRandomAcc, setCreatingRandomAcc] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { config, isLoadingSystemConfig, updateSystemConfig } =
        useAppSelector((state) => state.systemConfig);
    const handleGetSystemConfig = async () => {
        await dispatch(getSystemConfigAsync());
    };
    useEffect(() => {
        handleGetSystemConfig();
    }, []);

    useEffect(() => {
        if (config) {
            setConfigValue(config);
        }
    }, [config]);
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
            const addressList = getRandomAddress(userIdList);
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
        <Spin
            spinning={
                isLoadingSystemConfig ||
                updateSystemConfig.updatingSystemConfig ||
                creatingRandomAcc
            }
        >
            <Flex style={{ width: "100%" }} vertical align="center">
                <Title level={3}>Cấu hình hệ thống</Title>
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
                            style={{ width: "200px" }}
                            onClick={handleSubmit}
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
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
                            <Option value={Role.ROLE_USER}>Khách hàng</Option>
                            <Option value={Role.ROLE_REPAIRMAN}>
                                Thợ sửa chưaX
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        <Button
                            type="primary"
                            style={{ width: "200px" }}
                            onClick={handleSubmitAccList}
                        >
                            Tạo ngẫu nhiên
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </Spin>
    );
};

export default SystemConfig;
