import "./Password.scss";

import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../../core/reducers/authentication";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

type ValidateStatus =
    | ""
    | "error"
    | "success"
    | "warning"
    | "validating"
    | undefined;

const Password = () => {
    const [form] = Form.useForm();
    const [validateStatusRePass, setValidateStatusRePass] =
        useState<ValidateStatus>();
    const [helpValidate, setHelpValidate] = useState<string | null>();
    const { updatePassSuccess, updatePassFailed, errorMessageUpdatePass } =
        useAppSelector((state) => state.authentication.updatePassword);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (updatePassSuccess) {
            toast.success("Đổi mật khẩu thành công", { autoClose: 2000 });
            form.resetFields();
        } else if (updatePassFailed) {
            errorMessageUpdatePass?.forEach((mess: string) =>
                toast.error(mess)
            );
        }
    }, [updatePassSuccess, updatePassFailed, errorMessageUpdatePass, form]);

    const onFinishChangePass = async (values: any) => {
        if (
            values.newPassword &&
            values.reNewPassword &&
            values.newPassword !== values.reNewPassword
        ) {
            setValidateStatusRePass("error");
            setHelpValidate("Mật khẩu nhập lại không đúng");
            return;
        }
        await dispatch(changePassword(values));
    };

    const handleReNewPassChange = (e: any) => {
        if (e.target.value.trim()) {
            setValidateStatusRePass(undefined);
            setHelpValidate(null);
        }
    };

    return (
        <div className="account-password">
            <h2 style={{ marginBottom: "20px" }}>Đổi mật khẩu</h2>
            <div className="account-password-content">
                <Form
                    form={form}
                    onFinish={onFinishChangePass}
                    layout="vertical"
                >
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
                        help={helpValidate}
                        validateStatus={validateStatusRePass}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập lại mật khẩu mới",
                            },
                        ]}
                    >
                        <Input.Password
                            onChange={handleReNewPassChange}
                            placeholder="Nhập lại mật khẩu mới"
                        />
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
