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
            style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
        >
            <>
                <Title level={2}> ĐĂNG KÍ </Title>
            </>
            <Input placeholder="input placeholder" />
            <Input placeholder="input placeholder" />
            <Input placeholder="input placeholder" />
            <Input placeholder="input placeholder" />
            <Input placeholder="input placeholder" />
            <Input placeholder="input placeholder" />
            <Select
                placeholder="Bạn đăng kí với tài khoản"
                onChange={onGetAccount}
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

            <Form.Item {...buttonItemLayout}>
                <Button type="primary">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default SignUp;
