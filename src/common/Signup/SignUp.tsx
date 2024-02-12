import "./SignUp.scss";

import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Images from "../../assets/Images";
import { Role } from "../../core/auth/roles";
import {
    clearResend,
    clearVerify,
    resendOtp,
    reset,
    signUp,
    verifyOtp,
} from "../../core/reducers/register";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RoutePath } from "../../utils/constants";
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
    const { isAuthenticated, loginError, account } = useAppSelector(
        (state) => state.authentication
    );
    const { registrationSuccess, user, verifyOtpStatus, resendOtpStatus } =
        useAppSelector((state) => state.register);

    const [validateStatusRePass, setValidateStatusRePass] =
        useState<ValidateStatus>();
    const [helpValidate, setHelpValidate] = useState<string | null>();
    const [step, setStep] = useState<number>(1);
    const [otp, setOtp] = useState<string>("");

    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [time, setTime] = useState({ minute: 1, second: 0 });
    const { from } = location.state || {
        from:
            account.role === Role.ROLE_ADMIN || account.role === Role.ROLE_STAFF
                ? "/admin/home"
                : "/",
    };

    // useEffect(() => {
    //     if (isAuthenticated && loginSuccess) {
    //         dispatch(getAccount());
    //     }
    // }, [isAuthenticated, loginSuccess, dispatch]);

    useEffect(() => {
        if (registrationSuccess) {
            toast.success(
                "Đăng ký tài khoản thành công. Mã OTP đã được gửi đến email của bạn",
                { autoClose: 3000 }
            );
            setStep(2);
        }
    }, [navigate, registrationSuccess, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    useEffect(() => {
        let interval: NodeJS.Timer | number | undefined;
        if (step === 2) {
            interval = setInterval(() => {
                if (time.second === 0) {
                    if (time.minute === 0) {
                        clearInterval(interval);
                    } else {
                        setTime({
                            minute: time.minute - 1,
                            second: 59,
                        });
                    }
                } else {
                    setTime({ ...time, second: time.second - 1 });
                }
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [time, step]);

    useEffect(() => {
        if (otp && otp.length === 6) {
            verifyOtpFunc();
        }

        async function verifyOtpFunc() {
            console.log(user);

            await dispatch(verifyOtp({ otp, userId: user.userId }));
        }
    }, [otp]);

    useEffect(() => {
        if (verifyOtpStatus === "success") {
            toast.success("Xác thực tài khoản thành công");
            navigate("/login");
        } else if (verifyOtpStatus === "failed") {
            toast.error("Xác thực tài khoản thất bại");
            setOtp("");
            dispatch(clearVerify());
        }
    }, [verifyOtpStatus, dispatch]);

    useEffect(() => {
        if (resendOtpStatus === "success") {
            toast.success("Gửi lại mã OTP thành công");
            setTime({
                minute: 1,
                second: 0,
            });
            dispatch(clearResend());
        } else if (resendOtpStatus === "failed") {
            toast.error("Gửi lại mã OTP thất bại");
            dispatch(clearResend());
        }
    }, [resendOtpStatus, dispatch]);

    const resendOtpFunc = async () => {
        await dispatch(resendOtp({ phone: user.phone, email: user.email }));
    };

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
                <Row style={{ width: "100%", height: "100%" }}>
                    <Col
                        xxl={14}
                        xl={14}
                        lg={14}
                        md={24}
                        sm={24}
                        xs={24}
                        className="wrap-logo"
                    >
                        <img
                            style={{ width: "500px", height: "500px" }}
                            src={Images.logoSvg}
                            alt="icon"
                        />
                    </Col>
                    <Col
                        xxl={10}
                        xl={10}
                        lg={10}
                        md={24}
                        sm={24}
                        xs={24}
                        className="form-register-wrap"
                    >
                        <h1>Đăng ký</h1>
                        {step === 1 && (
                            <Form onFinish={onFinish} layout="vertical">
                                <Row gutter={20}>
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={12}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
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
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={12}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
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
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={12}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
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
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={12}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
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
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={12}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
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
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={12}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
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
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ background: "#435585" }}
                                    >
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
                        )}
                        {step === 2 && (
                            <div className="otp-wrap">
                                <div className="otp-title">
                                    Mã OTP đã được gửi đến email{" "}
                                    <span className="otp-title-email">
                                        {user?.email}{" "}
                                    </span>
                                    của bạn
                                </div>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props: any) => (
                                        <input {...props} />
                                    )}
                                    containerStyle={"otp-input-wrap"}
                                    inputStyle={"otp-input"}
                                />
                                <div className="otp-time">
                                    <span
                                        className="otp-link"
                                        onClick={resendOtpFunc}
                                    >
                                        Không nhận được OTP?
                                    </span>
                                    <div>
                                        Mã OTP hết hạn sau 0{time.minute}:
                                        {time.second < 10
                                            ? `0${time.second}`
                                            : time.second}
                                    </div>
                                </div>
                                <div className="otp-login">
                                    <Link
                                        to={"/login"}
                                        className="otp-link"
                                        style={{ marginTop: "20px" }}
                                    >
                                        Quay lại trang đăng nhập
                                    </Link>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default SignUp;
