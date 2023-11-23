import "./Public.scss";

import { Avatar, Badge, Dropdown, Input, Layout, Menu, MenuProps } from "antd";
import { Content, Header, Footer } from "antd/es/layout/layout";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { getAllSkillAsync } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RoutePath } from "../../routes";
import { IChildRoutePath, ISkill } from "../../utils/model";
import {
    BellOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { clearCookie } from "../../utils/functions/cookies";
import { resetAuth } from "../../core/reducers/authentication";

const Public = ({ children }: IChildRoutePath) => {
    const { account } = useAppSelector((state) => state.authentication);
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [itemMenu, setItemMenu] = useState<MenuProps["items"]>([]);

    const location = useLocation();

    const defaultSelectedKey = useRef(
        ["introduction", "introduce-services", "contact"].filter((s) =>
            location.pathname.includes(s)
        )
    );

    const logout = () => {
        clearCookie();
        dispatch(resetAuth());
    };

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

    const itemDrops: MenuProps["items"] = [
        {
            key: "1",
            label: <Link to="/user/my-profile">Thiết lập tài khoản</Link>,
        },
        {
            key: "2",
            label: <div onClick={logout}>Đăng xuất</div>,
        },
    ];

    return (
        <div className="public">
            <Layout>
                <Header
                    style={{
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

                    <Input
                        addonAfter={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Tìm kiếm dịch vụ"
                        // onChange={handleFindSkill}
                        style={{ width: "30%", background: "#f3f3f3" }}
                    />

                    <Menu
                        style={{
                            background: "transparent",
                        }}
                        mode="horizontal"
                        defaultSelectedKeys={defaultSelectedKey.current}
                        items={itemMenu}
                        className="main-menu"
                    />
                    <Link to={RoutePath.Contact}>
                        <Badge size="small" count={5}>
                            <ShoppingCartOutlined
                                style={{ color: "white", fontSize: "20px" }}
                            />
                        </Badge>
                    </Link>

                    <Link to={RoutePath.Contact}>
                        <Badge count={6} size="small">
                            <BellOutlined
                                style={{ color: "white", fontSize: "20px" }}
                            />
                        </Badge>
                    </Link>
                    {!Object.keys(account).length ? (
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
                    ) : (
                        <>
                            <span
                                className="navbar-account-name"
                                style={{ color: "white" }}
                            >
                                {account.accountName ||
                                    account.lastName + account.firstName}
                            </span>
                            <Dropdown
                                placement="bottomRight"
                                menu={{ items: itemDrops }}
                            >
                                <div style={{ cursor: "pointer" }}>
                                    {account.imageUrl ? (
                                        <Avatar src={account.imageUrl} />
                                    ) : (
                                        <Avatar
                                            style={{
                                                backgroundColor: "#f56a00",
                                            }}
                                            size="large"
                                        >
                                            <span
                                                style={{
                                                    fontSize: "20px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {(
                                                    account.accountName[0] ||
                                                    account.firstName
                                                ).toUpperCase()}
                                            </span>
                                        </Avatar>
                                    )}
                                </div>
                            </Dropdown>
                        </>
                    )}
                </Header>
                <Content
                    style={{
                        height: "calc(100vh - 64px)",
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                >
                    <div className="public-content">{children}</div>
                </Content>
                <Footer>hello</Footer>
            </Layout>
        </div>
    );
};

export default Public;
