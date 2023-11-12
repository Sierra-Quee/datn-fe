import "./Sidebar.scss";

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
import { Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";

import Images from "../../assets/Images";
import { RoutePath } from "../../routes";
import { SIDEBAR } from "../../utils/constants";
import { useRef } from "react";

export type MenuItem = Required<MenuProps>["items"][number];

interface ISidebarProps {
    collapsed: boolean;
    setCollapsed: () => void;
}

const Sidebar = ({ collapsed, setCollapsed }: ISidebarProps) => {
    const location = useLocation();

    const defaultSelectedKeys = useRef(
        [
            "home",
            "manage-order-list-order",
            "manage-order-list-order-comment",
            "manage-service-skill",
            "manage-service-services",
            "manage-user-list-employee",
            "manage-user-list-customer",
        ].filter((s) => s.includes(location.pathname.split("/")[1]))
    );

    const defaultOpenKeys = useRef(
        ["manage-order", "manage-service", "manage-user"].filter((s) =>
            defaultSelectedKeys.current[0].includes(s)
        )
    );

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
            "home",
            <HomeOutlined />
        ),
        getItem("Quản lý đơn hàng", "manage-order", <UnorderedListOutlined />, [
            getItem(
                <Link to={RoutePath.Order}>Danh sách đơn hàng</Link>,
                "manage-order-list-order"
            ),
            getItem(
                <Link to={RoutePath.Comment}>Các nhận xét về đơn hàng</Link>,
                "manage-order-list-order-comment"
            ),
        ]),
        getItem("Quản lý dịch vụ", "manage-service", <GlobalOutlined />, [
            getItem(
                <Link to={RoutePath.Skill}>Danh sách loại dịch vụ</Link>,
                "manage-service-skill"
            ),
            getItem(
                <Link to={RoutePath.Service}>Danh sách dịch vụ</Link>,
                "manage-service-services"
            ),
        ]),
        getItem("Quản lý người dùng", "manage-user", <UserOutlined />, [
            getItem(
                <Link to={RoutePath.Employee}>Danh sách thợ</Link>,
                "manage-user-list-employee"
            ),
            getItem(
                <Link to={RoutePath.Customer}>Danh sách khách hàng</Link>,
                "manage-user-list-customer"
            ),
        ]),
        getItem("Lịch sử thanh toán", "11", <WalletOutlined />),
        getItem("Cấu hình hệ thống", "12", <SettingOutlined />),
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
                        onClick={() => setCollapsed()}
                    />
                ) : (
                    <VerticalRightOutlined
                        style={{
                            color: "white",
                            fontSize: "25px",
                            cursor: "pointer",
                        }}
                        onClick={() => setCollapsed()}
                    />
                )}
            </div>
            <Menu
                defaultSelectedKeys={defaultSelectedKeys.current}
                defaultOpenKeys={defaultOpenKeys.current}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
            />
        </div>
    );
};

export default Sidebar;
