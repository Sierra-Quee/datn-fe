import React, { useState } from "react";
import Title from "antd/es/typography/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Checkbox, Form, Input } from "antd";
import { logInAsync } from "../Auth/AuthSlice";
import { useAppDispatch } from "../redux/hook";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const LogIn = () => {
    const [inputPhone, setInputPhone] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
const dispatch = useAppDispatch();
    const handleInputPhone=(newValue: React.ChangeEventHandler<HTMLInputElement> | undefined)=>{
    setInputPhone(newValue as unknown  as string|| "");
    }
    const handleInputPassword=(newValue: React.ChangeEventHandler<HTMLInputElement> | undefined)=>{
        setInputPhone(newValue as unknown  as string|| "");
        }
    const onFinish = async (values: any) => {
        await dispatch(logInAsync({phone: values.username, password: values.password}));
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div style={{width:"50%", margin:"auto"}}>
            <div style={{display:"flex", margin:"auto", width:"50%"}} >
                <FontAwesomeIcon icon={faUser} style={{margin:"40px 60px 0px"}}/>
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
                    <Input value={inputPassword} onChange={() => handleInputPhone}/>
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
                    <Input.Password  value={inputPassword} onChange = {() => handleInputPassword}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Lưu đăng nhập</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{width:"75%", display:"flex", justifyContent:"flex-end"}}>
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LogIn;
