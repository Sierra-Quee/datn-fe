import React, { useEffect, useState } from "react";
import "./SystemConfig.scss";
import { Button, Flex, Form, Input, Select, Spin, Typography } from "antd";
import { ISystemConfig } from "../../utils/model";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
    getSystemConfigAsync,
    updateSystemConfigAsync,
} from "../../core/reducers/system-config";
import { Role } from "../../core/auth/roles";
import { generateRandomAccountList } from "../../utils/functions/randomAccount";
import { createMultiUserAsync } from "../../core/reducers/users";
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
        console.log({ list });
        await dispatch(createMultiUserAsync(list));
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
                isLoadingSystemConfig || updateSystemConfig.updatingSystemConfig
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
                <Form onValuesChange={handleRandomAccChange}>
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
                    <Button onClick={handleSubmitAccList}>
                        Tạo ngẫu nhiên
                    </Button>
                </Form>
            </Flex>
        </Spin>
    );
};

export default SystemConfig;
