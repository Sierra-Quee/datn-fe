import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, FormInstance, Input, Radio, Select } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const SignUp = () => {
    const [form] = Form.useForm();
    const formRef = React.useRef<FormInstance>(null);
    const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };

    const formItemLayout =
        formLayout === "horizontal"
            ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
            : null;

    const buttonItemLayout =
        formLayout === "horizontal"
            ? { wrapperCol: { span: 14, offset: 4 } }
            : null;
    const onGetAccount = (value: string) => {
        switch (value) {
            case "Tài khoản khách hàng":
                break;
            case "Tài khoản nhân viên":
                break;
            default:
                break;
        }
    };
    return (
        <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            initialValues={{ layout: formLayout }}
            onValuesChange={onFormLayoutChange}
            style={{ maxWidth: formLayout === "inline" ? "none" : 600, width:"50%", margin:"auto"}}
        >
            <div style={{display:"flex", justifyContent:"center"}} >
                <FontAwesomeIcon icon={faUser} style={{margin:"40px 20px 15px"}}/>
                <Title level={2}> ĐĂNG KÍ </Title>
            </div>
            <Input style ={{marginBottom:"15px"}} placeholder="Tên đăng kí" />
            <Input style ={{marginBottom:"15px"}} placeholder="Email" />
            <Input style ={{marginBottom:"15px"}} placeholder="Số điện thoại" />
            <Input style ={{marginBottom:"15px"}} placeholder="Địa chỉ" />
            <Input style ={{marginBottom:"15px"}} placeholder="Mật khẩu" />
            <Input style ={{marginBottom:"15px"}} placeholder="Nhập lại mật khẩu" />
            <Select
                placeholder="Bạn đăng kí với tài khoản"
                onChange={onGetAccount}
                style={{width:"100%", marginBottom:"15px"}}
                allowClear
                options={[
                    {
                        value: "Tài khoản khách hàng",
                        label: "Tài khoản khách hàng",
                    },
                    {
                        value: "Tài khoản nhân viên",
                        label: "Tài khoản nhân viên",
                    },
                ]}
            />

            <Form.Item {...buttonItemLayout} style={{width:"100%", display:"flex", justifyContent:"center"}}>
                <Button type="primary">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default SignUp;
