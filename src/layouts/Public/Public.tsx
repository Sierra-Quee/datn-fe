import "./Public.scss";

import { Layout, Menu, MenuProps } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { getAllSkillAsync } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RoutePath } from "../../routes";
import { IChildRoutePath, ISkill } from "../../utils/model";
import { BellOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const Public = ({ children }: IChildRoutePath) => {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [itemMenu, setItemMenu] = useState<MenuProps["items"]>([]);

    const location = useLocation();

    const defaultSelectedKey = useRef(
        ["introduction", "introduce-services", "contact"].filter((s) =>
            location.pathname.includes(s)
        )
    );

    const items = useRef([
        {
            label: <Link to={RoutePath.Introduce}>Giới thiệu</Link>,
            key: "introduction",
        },
        {
            label: <Link to={RoutePath.Contact}>Dịch vụ</Link>,
            key: "introduce-services",
        },
        {
            label: <Link to={RoutePath.Contact}>Liên hệ</Link>,
            key: "contact",
        },
    ]);

    const dispatch = useAppDispatch();

    const { listSkill } = useAppSelector((state) => state.skill);

    useEffect(() => {
        handleGetAllSkillAsync();
    }, []);

    useEffect(() => {
        setSkills([...listSkill.filter((skill) => skill.isActive)]);
    }, [listSkill]);

    useEffect(() => {
        if (skills && skills.length > 0) {
            setItemMenu([
                ...items?.current.map((item: ItemType) => {
                    if (item?.key === "introduce-services") {
                        return {
                            ...item,
                            children: [
                                ...(skills.map((skill) => {
                                    return {
                                        label: (
                                            <Link
                                                to={`${RoutePath.IntroduceServices}/${skill.skillId}`}
                                            >
                                                {skill.name}
                                            </Link>
                                        ),
                                        key: skill.skillId,
                                    };
                                }) as ItemType[]),
                            ],
                        } as ItemType;
                    }
                    return item;
                }),
            ]);
        } else {
            const newMenu = [...items.current];
            newMenu.splice(1, 1);

            setItemMenu(newMenu);
        }
    }, [items, skills]);

    const handleGetAllSkillAsync = async () => {
        await dispatch(getAllSkillAsync());
    };

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
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ width: "20%" }}>
                        <a href="/" className="header-title">
                            Ismart
                        </a>
                    </div>

                    <Menu
                        style={{
                            paddingLeft: 35,
                            backgroundColor: "transparent",
                            color: "white",
                            transitionDuration: "0",
                            width: "60%",
                        }}
                        mode="horizontal"
                        defaultSelectedKeys={defaultSelectedKey.current}
                        items={itemMenu}
                    />
                    <Link
                        to={RoutePath.Contact}
                        style={{ color: "white", fontSize: "20px" }}
                    >
                        <ShoppingCartOutlined />
                    </Link>

                    <Link
                        to={RoutePath.Contact}
                        style={{ color: "white", fontSize: "20px" }}
                    >
                        <BellOutlined />
                    </Link>
                    {}
                    <div>
                        <Link
                            to={RoutePath.SignUp}
                            style={{
                                color: "white",
                            }}
                        >
                            Đăng ký {" / "}
                        </Link>
                        <Link
                            to={RoutePath.Login}
                            style={{
                                color: "white",
                            }}
                        >
                            Đăng nhập
                        </Link>
                    </div>
                </Header>
                {/* <Content
                    style={{ height: "calc(100vh - 64px)", overflow: "auto" }}
                >
                    <Menu
                        style={{ paddingLeft: 35 }}
                        mode="horizontal"
                        defaultSelectedKeys={defaultSelectedKey.current}
                        items={itemMenu}
                    />
                    <div className="public-content">{children}</div>
                </Content> */}
            </Layout>
        </div>
    );
};

export default Public;
