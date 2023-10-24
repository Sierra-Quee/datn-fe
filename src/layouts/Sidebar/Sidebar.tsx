import { Menu, MenuProps } from "antd";
import {
    HomeOutlined,
    UnorderedListOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import "./Sidebar.scss";
import Images from "../../assets/Images";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

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
        ]),
    ];

    return (
        <div
            className="sidebar"
            style={{ width: collapsed ? "85px" : "250px" }}
        >
            <div className="sidebar-logo">
                <img
                    src={Images.logo}
                    className="sidebar-logo-image"
                    style={{ width: collapsed ? "0px" : "120px" }}
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
