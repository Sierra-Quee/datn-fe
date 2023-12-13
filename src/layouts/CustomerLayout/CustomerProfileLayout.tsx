import React from "react";
import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { IChildRoutePath } from "../../utils/model";
import Public from "../Public/Public";
import { Link } from "react-router-dom";
import "./CustomerProfileLayout.scss";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
};
const menuItems: MenuItem[] = [
    getItem("Tài khoản của tôi", "accountManagement", <UserOutlined />, [
        getItem(
            <Link to={"/user/my-profile"}>Thông tin tài khoản</Link>,
            "profile"
        ),
        getItem(<Link to={"/user/password"}>Mật khẩu</Link>, "password"),
        getItem(<Link to={"/user/address"}>Địa chỉ</Link>, "address"),
    ]),
    getItem(
        <Link to={"/user/order"}>Đơn sửa chữa</Link>,
        "order",
        <LaptopOutlined />
    ),
    getItem(
        <Link to={"/"}>Thông báo</Link>,
        "notifications",
        <NotificationOutlined />
    ),
];
const CustomerProfileLayout = ({ children, breadcrumb }: IChildRoutePath) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Public>
            <Breadcrumb style={{ margin: "16px 0" }}>
                {breadcrumb?.map((value) => (
                    <Breadcrumb.Item>{value}</Breadcrumb.Item>
                ))}
            </Breadcrumb>
            <Layout
                style={{
                    padding: "24px 0",
                    background: colorBgContainer,
                    width: "80%",
                    margin: "auto",
                    marginBottom: "24px",
                    borderRadius: "5px",
                }}
            >
                <Sider style={{ background: colorBgContainer }} width={250}>
                    <Menu
                        mode="inline"
                        items={menuItems}
                        inlineCollapsed={true}
                        style={{ height: "100%" }}
                    />
                </Sider>
                <Content style={{ height: "80vh" }}>{children}</Content>
            </Layout>
        </Public>
    );
};

export default CustomerProfileLayout;
