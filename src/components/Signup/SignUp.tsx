import "./SignUp.scss";

import { Button, Col, DatePicker, Form, Input, Row, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Images from "../../assets/Images";
import { getAccount } from "../../core/reducers/authentication";
import { reset, signUp } from "../../core/reducers/register";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RoutePath } from "../../routes";
import { FORMAT_DATE } from "../../utils/constants";
import { formatDate } from "../../utils/functions/utils";

type ValidateStatus =
    | ""
    | "error"
    | "success"
    | "warning"
    | "validating"
    | undefined;

const SignUp = () => {
    const { isAuthenticated, loginError, loginSuccess } = useAppSelector(
        (state) => state.authentication
    );
    const { loading, registrationSuccess, registrationFailure, errorMessage } =
        useAppSelector((state) => state.register);

    const [validateStatusRePass, setValidateStatusRePass] =
        useState<ValidateStatus>();
    const [helpValidate, setHelpValidate] = useState<string | null>();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { from } = location.state || { from: "/" };

    useEffect(() => {
        if (isAuthenticated && loginSuccess) {
            dispatch(getAccount());
        }
    }, [isAuthenticated, loginSuccess, dispatch]);

    useEffect(() => {
        if (registrationSuccess) {
            toast.success("Đăng ký tài khoản thành công", { autoClose: 2000 });
            navigate("/login");
        } else if (registrationFailure) {
            errorMessage.forEach((mess: string) => toast.error(mess));
        }

        return (): void => {
            dispatch(reset());
        };
    }, [
        navigate,
        registrationSuccess,
        registrationFailure,
        errorMessage,
        dispatch,
    ]);

    const onFinish = async (values: any) => {
        if (
            values.password &&
            values.rePassword &&
            values.password !== values.rePassword
        ) {
            setValidateStatusRePass("error");
            setHelpValidate("Mật khẩu nhập lại không đúng");
            return;
        }
        await dispatch(signUp({ ...values, dob: formatDate(values.dob) }));
    };

    const handleRePassChange = (e: any) => {
        if (e.target.value.trim()) {
            setValidateStatusRePass(undefined);
            setHelpValidate(null);
        }
    };

    return (
        <div className="register-wrap">
            {isAuthenticated ? (
                <Navigate replace to={from} />
            ) : (
                <Spin spinning={loading}>
                    <Row style={{ width: "100%", height: "100%" }}>
                        <Col span={14} className="wrap-logo">
                            <img
                                style={{ width: "400px", height: "400px" }}
                                src={Images.ismart}
                                alt="icon"
                            />
                            <h2 style={{ textAlign: "center" }}>
                                Hệ thống sửa chữa điện lạnh ISmart
                            </h2>
                        </Col>
                        <Col span={10} className="form-register-wrap">
                            <Form onFinish={onFinish} layout="vertical">
                                <h1>Đăng ký</h1>
                                <Row gutter={20}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Họ"
                                            name="lastName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập họ của bạn",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập họ của bạn" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Tên"
                                            name="firstName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập tên của bạn",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập tên của bạn" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Số điện thoại"
                                            name="phone"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập số điện thoại của bạn",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập số điện thoại của bạn" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập email của bạn",
                                                },
                                                {
                                                    type: "email",
                                                    message:
                                                        "Không đúng định dang email!",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập email của bạn" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Giới tính"
                                            name="gender"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng chọn giới tính của bạn",
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Chọn giới tính của bạn">
                                                <Select.Option value={true}>
                                                    Nam
                                                </Select.Option>
                                                <Select.Option value={false}>
                                                    Nữ
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Ngày tháng năm sinh"
                                            name="dob"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng chọn ngày tháng năm sinh của bạn",
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                format={FORMAT_DATE}
                                                placeholder="Chọn ngày tháng năm sinh"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập mật khẩu của bạn",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Nhập mật khẩu của bạn" />
                                </Form.Item>
                                <Form.Item
                                    label="Nhập lại mật khẩu"
                                    name="rePassword"
                                    help={helpValidate}
                                    validateStatus={validateStatusRePass}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập lại mật khẩu của bạn",
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        onChange={handleRePassChange}
                                        placeholder="Nhập lại mật khẩu của bạn"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Đăng ký
                                    </Button>
                                </Form.Item>
                                {!isAuthenticated && loginError && (
                                    <Form.Item>
                                        <div className="error-message">
                                            Số điện thoại hoặc mật khẩu không
                                            chính xác
                                        </div>
                                    </Form.Item>
                                )}
                                <Form.Item>
                                    <Link to={RoutePath.Login}>
                                        Đã có tài khoản ?
                                    </Link>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Spin>
            )}
        </div>
    );
};

export default SignUp;
