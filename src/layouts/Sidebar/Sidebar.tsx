import { Menu, MenuProps } from "antd";
import {
    GlobalOutlined,
    HomeOutlined,
    SettingOutlined,
    UnorderedListOutlined,
    UserOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined,
    WalletOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import "./Sidebar.scss";
import Images from "../../assets/Images";
import { Link } from "react-router-dom";

export type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

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

    const items: MenuItem[] = [
        getItem(<Link to="/">Trang chủ</Link>, "1", <HomeOutlined />),
        getItem("Quản lý đơn hàng", "2", <UnorderedListOutlined />, [
            getItem(<Link to="lis-order">Danh sách đơn hàng</Link>, "3"),
            getItem(
                <Link to="lis-order-comment">Các nhận xét về đơn hàng</Link>,
                "4"
            ),
        ]),
        getItem("Quản lý dịch vụ", "5", <GlobalOutlined />),
        getItem("Quản lý người dùng", "6", <UserOutlined />, [
            getItem(<Link to="list-employee">Danh sách thợ</Link>, "7"),
            getItem(<Link to="lis-customer">Danh sách khách hàng</Link>, "8"),
        ]),
        getItem("Lịch sử thanh toán", "9", <WalletOutlined />),
        getItem("Cấu hình hệ thống", "10", <SettingOutlined />),
    ];

    return (
        <div
            className="sidebar"
            style={{ width: collapsed ? "85px" : "250px" }}
        >
            <div className="sidebar-logo">
                <img
                    src={Images.ismart}
                    className="sidebar-logo-image"
                    style={{ width: collapsed ? "0px" : "150px" }}
                    alt="logo"
                />

                {collapsed ? (
                    <VerticalLeftOutlined
                        style={{
                            color: "white",
                            fontSize: "25px",
                            cursor: "pointer",
                        }}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                ) : (
                    <VerticalRightOutlined
                        style={{
                            color: "white",
                            fontSize: "25px",
                            cursor: "pointer",
                        }}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                )}
            </div>
            <Menu
                defaultSelectedKeys={["1"]}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    );
};

export default Sidebar;
