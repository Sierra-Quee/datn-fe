import React, { useEffect, useState } from "react";
import "./SystemConfig.scss";
import { Button, Flex, Form, Input, Spin, Typography } from "antd";
import { ISystemConfig } from "../../utils/model";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
    getSystemConfigAsync,
    updateSystemConfigAsync,
} from "../../core/reducers/system-config";
const { Title } = Typography;
type Props = {};

const SystemConfig = (props: Props) => {
    const formItemLayout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };
    const buttonItemLayout = { wrapperCol: { span: 14, offset: 14 } };
    const [configValue, setConfigValue] = useState<ISystemConfig>();
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
            </Flex>
        </Spin>
    );
};

export default SystemConfig;
