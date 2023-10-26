import { Button, Col, Form, Input, Row, Spin } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import {
    ILoginParams,
    getAccount,
    login,
} from "../../core/reducers/authentication";
import "./Login.scss";
import Images from "../../assets/Images";
import { RoutePath } from "../../routes";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { checkNullObj } from "../../utils/functions/utils";

const LogIn = () => {
    const { isAuthenticated, loginError, loginSuccess, loading, account } =
        useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { from } = location.state || { from: "/" };

    useEffect(() => {
        if (isAuthenticated && loginSuccess) {
            getAccountInfo();
        }
        async function getAccountInfo() {
            await dispatch(getAccount());
        }
    }, [isAuthenticated, loginSuccess, dispatch]);

    const onFinish = async (values: any) => {
        await dispatch(
            login({ phone: values.phone, password: values.password })
        );
    };

    return (
        <div className="login-wrap">
            {isAuthenticated && !checkNullObj(account) ? (
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
                            <h2>Hệ thống sửa chữa điện lạnh ISmart</h2>
                        </Col>
                        <Col span={10} className="form-login-wrap">
                            <Form onFinish={onFinish} layout="vertical">
                                <h1>Đăng nhập</h1>
                                <Form.Item<ILoginParams>
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập số điện thoại",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập số điện thoại của bạn" />
                                </Form.Item>
                                <Form.Item<ILoginParams>
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mật khẩu",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Nhập số điện thoại của bạn" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Đăng nhập
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
                                    <Link to={RoutePath.SignUp}>
                                        Chưa có tài khoản ?
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

export default LogIn;
