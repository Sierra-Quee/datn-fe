import React, { useState } from "react";
import Title from "antd/es/typography/Title";
import { Button, Checkbox, Form, Input } from "antd";
import { useAppDispatch } from "../redux/hook";
import { login } from "../../core/reducers/authentication";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const LogIn = () => {
    const [inputPhone, setInputPhone] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const dispatch = useAppDispatch();
    const handleInputPhone = (
        newValue: React.ChangeEventHandler<HTMLInputElement> | undefined
    ) => {
        setInputPhone((newValue as unknown as string) || "");
    };
    const handleInputPassword = (
        newValue: React.ChangeEventHandler<HTMLInputElement> | undefined
    ) => {
        setInputPhone((newValue as unknown as string) || "");
    };
    const onFinish = async (values: any) => {
        await dispatch(
            login({ phone: values.username, password: values.password })
        );
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <div>
                <Title level={2}> ĐĂNG NHẬP </Title>
            </div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên đăng nhập"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Hãy nhập tên đăng nhập của bạn!",
                        },
                    ]}
                >
                    <Input
                        value={inputPhone}
                        onChange={() => handleInputPhone}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Hãy nhập mật khẩu của bạn!",
                        },
                    ]}
                >
                    <Input.Password
                        value={inputPassword}
                        onChange={() => handleInputPassword}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Lưu đăng nhập</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LogIn;
