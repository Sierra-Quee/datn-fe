import "./Public.scss";

import { Layout, Menu, MenuProps, QRCode } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    HomeFilled,
    MailFilled,
    PhoneFilled,
    PushpinFilled,
} from "@ant-design/icons";
import { getAllSkillAsync } from "../../core/reducers/skill";
import useDebounce from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RoutePath } from "../../routes";
import { IChildRoutePath, ISkill } from "../../utils/model";

const Public = ({ children }: IChildRoutePath) => {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [itemMenu, setItemMenu] = useState<MenuProps["items"]>([]);

    const location = useLocation();
    const debounce = useDebounce(searchInput);

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
            label: "Dịch vụ",
            key: "introduce-services",
        },
        {
            label: <Link to={RoutePath.Contact}>Liên hệ</Link>,
            key: "contact",
        },
    ]);

    const dispatch = useAppDispatch();

    const { listSkill } = useAppSelector((state) => state.skill);
    // useEffect(() => {
    //     setServices(
    //         listService.filter((s) =>
    //             s.name.toLowerCase().includes(searchInput.toLowerCase())
    //         )
    //     );
    // }, [debounce]);
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
    const handleFind = (e: any) => {
        setSearchInput(e.target.value);
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
                    <a href="/" className="header-title">
                        Ismart
                    </a>

                    <Link
                        to={RoutePath.Login}
                        style={{
                            color: "white",
                        }}
                    >
                        Đăng nhập
                    </Link>
                </Header>
                <Content
                    style={{ height: "calc(100vh - 64px)", overflow: "auto" }}
                >
                    <Menu
                        style={{ paddingLeft: 35 }}
                        mode="horizontal"
                        defaultSelectedKeys={defaultSelectedKey.current}
                        items={itemMenu}
                    />
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
