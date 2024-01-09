import "./Public.scss";

import {
    Avatar,
    Badge,
    Button,
    Divider,
    Dropdown,
    Input,
    Layout,
    Menu,
    MenuProps,
    QRCode,
    theme,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { ItemType } from "antd/es/menu/hooks/useItems";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    BellOutlined,
    HomeFilled,
    MailFilled,
    PhoneFilled,
    PushpinFilled,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { resetAuth } from "../../core/reducers/authentication";
import { getCartAsync } from "../../core/reducers/cart";
import { getAllNotificationsAsync } from "../../core/reducers/notification";
import { getAllSkillAsync } from "../../core/reducers/skill";
import useDebounce from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RoutePath } from "../../utils/constants";
import { clearCookie } from "../../utils/functions/cookies";
import { IChildRoutePath, ISkill } from "../../utils/model";
const { useToken } = theme;
const { Search } = Input;
const Public = ({ children }: IChildRoutePath) => {
    const { token } = useToken();
    const { account } = useAppSelector((state) => state.authentication);
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [itemMenu, setItemMenu] = useState<MenuProps["items"]>([]);
    const { cartItemList, loadingCart, cartItemQuantity } = useAppSelector(
        (state) => state.cart
    );
    const location = useLocation();
    const debounce = useDebounce(searchInput);

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
    const { notificationList } = useAppSelector((state) => state.notification);

    useEffect(() => {
        handleGetAllSkillAsync();
    }, []);

    useEffect(() => {
        setSkills([...listSkill.filter((skill) => skill.isActive)]);
    }, [listSkill]);

    useEffect(() => {
        handleGetCartAsync();
    }, []);
    const handleGetNotificationList = async () => {
        await dispatch(getAllNotificationsAsync());
    };
    useEffect(() => {
        const getNotificationInterval = setInterval(() => {
            handleGetNotificationList();
        }, 50000);
        return () => clearInterval(getNotificationInterval);
    }, []);

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
    const handleGetCartAsync = async () => {
        await dispatch(getCartAsync());
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

    const notificationItems: MenuProps["items"] = notificationList.map(
        (notification) => {
            return {
                key: notification.notificationId,
                label: <div>{notification.content}</div>,
            };
        }
    );
    const menuStyle: React.CSSProperties = {
        boxShadow: "none",
    };
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
                        background: "#363062",
                    }}
                >
                    <div style={{ width: "20%" }}>
                        <a href="/" className="header-title">
                            Ismart
                        </a>
                    </div>

                    {/* <Input
                        addonAfter={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Tìm kiếm dịch vụ"
                        // onChange={handleFindSkill}
                        style={{ width: "30%", background: "#f3f3f3" }}
                    /> */}
                    <div className="searchInput">
                        <Search
                            placeholder="input search text"
                            style={{ width: 400, padding: 0, margin: 0 }}
                        />
                    </div>

                    <Menu
                        style={{
                            background: "transparent",
                        }}
                        mode="horizontal"
                        defaultSelectedKeys={defaultSelectedKey.current}
                        items={itemMenu}
                        className="main-menu"
                    />
                    <Link to={RoutePath.CustomerCart}>
                        <Badge size="small" count={cartItemQuantity}>
                            <ShoppingCartOutlined
                                style={{ color: "white", fontSize: "20px" }}
                            />
                        </Badge>
                    </Link>

                    <Link to={RoutePath.Contact}>
                        <Dropdown
                            menu={{ items: notificationItems }}
                            placement="bottomLeft"
                            dropdownRender={(menu) => (
                                <div
                                    style={{
                                        background: "#fff",
                                        padding: "10px",
                                    }}
                                >
                                    {React.cloneElement(menu as ReactElement, {
                                        style: menuStyle,
                                    })}
                                    <Divider
                                        style={{ padding: 0, margin: 0 }}
                                    />
                                    <Button
                                        style={{
                                            margin: 0,
                                            background: "#435585",
                                        }}
                                        type="primary"
                                        size="small"
                                    >
                                        Xem tất cả
                                    </Button>
                                </div>
                            )}
                        >
                            <Badge count={notificationList.length} size="small">
                                <BellOutlined
                                    style={{ color: "white", fontSize: "20px" }}
                                />
                            </Badge>
                        </Dropdown>
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
                        minHeight: "calc(100vh - 64px)",
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                >
                    <div className="public-content">{children}</div>
                    {/* <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Tìm kiếm"
                        onChange={handleFind}
                    /> */}
                </Content>
                <Footer className="footer">
                    <div className="right-footer">
                        <h2>ISmart</h2>
                        <div className="item-footer">
                            <HomeFilled />
                            <span className="contact-content-title">
                                <b>Tổng Công ty Cổ phần Công trình ISmart</b>
                            </span>
                        </div>
                        <div className="item-footer">
                            <PhoneFilled />
                            <span className="contact-content-title">
                                <b>Hotline:</b> 0123456789
                            </span>
                        </div>
                        <div className="item-footer">
                            <MailFilled />
                            <span className="contact-content-title">
                                <b>Email: congtrinhviettel@viettel.com.vn</b>
                            </span>
                        </div>
                    </div>
                    <div className="between-footer">
                        <h2>CHÍNH SÁCH VÀ QUY ĐỊNH</h2>
                        <div className="item-footer">
                            <Link
                                style={{
                                    color: "white",
                                }}
                                to="https://aioservice.com.vn/cam-ket-va-quy-dinh-ve-dich-vu"
                            >
                                <PushpinFilled
                                    style={{ marginRight: "10px" }}
                                />
                                Cam kết và quy định về dịch vụ
                            </Link>
                        </div>
                        <div>
                            <Link
                                style={{
                                    color: "white",
                                }}
                                to="https://aioservice.com.vn/chinh-sach-va-quy-dinh"
                            >
                                <PushpinFilled
                                    style={{ marginRight: "10px" }}
                                />
                                Chính sách và quy định
                            </Link>
                        </div>
                        <div>
                            <Link
                                style={{
                                    color: "white",
                                }}
                                to="https://aioservice.com.vn/chinh-sach-bao-mat"
                            >
                                <PushpinFilled
                                    style={{ marginRight: "10px" }}
                                />
                                Chính sách bảo mật
                            </Link>
                        </div>
                        <div>
                            <Link
                                style={{
                                    color: "white",
                                }}
                                to="https://aioservice.com.vn/phuong-thuc-thanh-toan"
                            >
                                <PushpinFilled
                                    style={{ marginRight: "10px" }}
                                />
                                Phương thức thanh toán
                            </Link>
                        </div>
                    </div>
                    <div className="left-footer">
                        <h2 className="title-left-footer">Tải ứng dụng</h2>
                        <div>
                            <Link
                                style={{
                                    color: "white",
                                }}
                                to="https://play.google.com/store/apps/details?id=com.vcc.homeservicesuser&pli=1"
                            >
                                <PushpinFilled
                                    style={{ marginRight: "10px" }}
                                />
                                Android
                            </Link>
                        </div>
                        <div>
                            <Link
                                style={{
                                    color: "white",
                                }}
                                to="https://apps.apple.com/vn/app/home-services-d%E1%BB%8Bch-v%E1%BB%A5-t%E1%BA%A1i-nh%C3%A0/id1556454387?l=vi?l=vi"
                            >
                                <PushpinFilled
                                    style={{ marginRight: "10px" }}
                                />
                                IOS
                            </Link>
                        </div>
                        <div
                            style={{
                                backgroundColor: "white",
                            }}
                        >
                            <QRCode value="http://localhost:4000/" />
                        </div>
                    </div>
                </Footer>
            </Layout>
        </div>
    );
};

export default Public;
