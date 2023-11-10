import "./Public.scss";

import { Layout, Menu, MenuProps } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

import { getAllSkillAsync } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RoutePath } from "../../routes";
import { IChildRoutePath, ISkill } from "../../utils/model";
import { useEffect, useRef, useState } from "react";
import { ItemType } from "antd/es/menu/hooks/useItems";

const Public = ({ children }: IChildRoutePath) => {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [itemMenu, setItemMenu] = useState<MenuProps["items"]>([]);

    const items = useRef([
        {
            label: <Link to={RoutePath.Introduce}>Giới thiệu</Link>,
            key: "introduce",
        },
        {
            label: "Dịch vụ",
            key: "services",
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
        setItemMenu([
            ...items?.current.map((item: ItemType) => {
                if (item?.key === "services") {
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
                        items={itemMenu}
                    />
                    <div className="public-content">{children}</div>
                </Content>
            </Layout>
        </div>
    );
};

export default Public;
