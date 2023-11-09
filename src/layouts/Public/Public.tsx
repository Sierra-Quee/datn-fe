import "./Public.scss";

import { Layout, Menu, MenuProps } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { RoutePath } from "../../routes";

export interface PublicProps {
    children: ReactNode;
}

const Public = ({ children }: PublicProps) => {
    const items: MenuProps["items"] = [
        {
            label: <Link to={RoutePath.Introduce}>Giới thiệu</Link>,
            key: "introduce",
        },
        {
            label: <Link to={RoutePath.IntroduceServices}>Dịch vụ</Link>,
            key: "services",
        },
        {
            label: <Link to={RoutePath.Contact}>Liên hệ</Link>,
            key: "contact",
        },
    ];

    return (
        <div className="public">
            <Layout>
                <Header
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <a href="/" className="header-title">
                        Ismart
                    </a>
                </Header>
                <Content
                    style={{ height: "calc(100vh - 64px)", overflow: "auto" }}
                >
                    <Menu
                        style={{ paddingLeft: 35 }}
                        mode="horizontal"
                        items={items}
                    />
                    <div className="public-content">{children}</div>
                </Content>
            </Layout>
        </div>
    );
};

export default Public;
