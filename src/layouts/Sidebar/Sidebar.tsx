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
import { Link, useLocation } from "react-router-dom";
import { RoutePath } from "../../routes";
import { SIDEBAR } from "../../utils/constants";

export type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const location = useLocation();

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
        getItem(
            <Link to={RoutePath.Home}>Trang chủ</Link>,
            "1",
            <HomeOutlined />
        ),
        getItem("Quản lý đơn hàng", "2", <UnorderedListOutlined />, [
            getItem(<Link to={RoutePath.Order}>Danh sách đơn hàng</Link>, "3"),
            getItem(
                <Link to={RoutePath.Comment}>Các nhận xét về đơn hàng</Link>,
                "4"
            ),
        ]),
        getItem("Quản lý dịch vụ", "5", <GlobalOutlined />, [
            getItem(
                <Link to={RoutePath.Skill}>Danh sách loại dịch vụ</Link>,
                "6"
            ),
            getItem(<Link to={RoutePath.Service}>Danh sách dịch vụ</Link>, "7"),
        ]),
        getItem("Quản lý người dùng", "8", <UserOutlined />, [
            getItem(<Link to={RoutePath.Employee}>Danh sách thợ</Link>, "9"),
            getItem(
                <Link to={RoutePath.Customer}>Danh sách khách hàng</Link>,
                "10"
            ),
        ]),
        getItem("Lịch sử thanh toán", "11", <WalletOutlined />),
        getItem("Cấu hình hệ thống", "12", <SettingOutlined />),
    ];

    const getSelectedKey = (): string => {
        return SIDEBAR.filter((item) => item.path === location.pathname)[0].key;
    };

    const getSelectedOpenKey = (): string => {
        const item = SIDEBAR.filter((item) => item.path === location.pathname);
        return item.length > 0 ? (item[0].openKey as string) : "";
    };

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
