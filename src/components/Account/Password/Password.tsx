import { Button, Form, Input } from "antd";

import "./Password.scss";

const Password = () => {
    const onFinishChangePass = (values: any) => {};

    return (
        <div className="account-password">
            <h2 style={{ marginBottom: "20px" }}>Đổi mật khẩu</h2>
            <div className="account-password-content">
                <Form onFinish={onFinishChangePass} layout="vertical">
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu cũ",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu cũ" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu mới",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu mới"
                        name="reNewPassword"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập lại mật khẩu mới",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập lại mật khẩu mới" />
                    </Form.Item>
                    <Form.Item style={{ float: "inline-end" }}>
                        <Button type="primary" htmlType="submit">
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Password;
