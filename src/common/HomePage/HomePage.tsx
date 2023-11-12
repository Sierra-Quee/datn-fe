import "./HomePage.scss";

import { Card, Carousel, Empty, Rate, Spin } from "antd";
import { useEffect, useState } from "react";

import Images from "../../assets/Images";
import { getAllServiceAsync } from "../../core/reducers/service";
import { getAllSkillAsync } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IService, ISkill } from "../../utils/model";

const HomePage = () => {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [services, setServices] = useState<IService[]>([]);

    const dispatch = useAppDispatch();

    const { listSkill, loadingSkill } = useAppSelector((state) => state.skill);
    const { listService, isLoadingService } = useAppSelector(
        (state) => state.service
    );

    useEffect(() => {
        handleGetAllSkillAsync();
        handleGetAllServiceAsync();
    }, [dispatch]);

    useEffect(() => {
        setSkills([...listSkill.filter((skill) => skill.isActive)]);
        setServices([...listService.filter((service) => service.isActive)]);
    }, [listSkill, listService]);

    const handleGetAllSkillAsync = async () => {
        await dispatch(getAllSkillAsync());
    };

    const handleGetAllServiceAsync = async () => {
        await dispatch(getAllServiceAsync());
    };

    return (
        <Spin spinning={loadingSkill || isLoadingService}>
            <div className="home-page">
                <Carousel autoplay className="carousel">
                    <img src={Images.cold_machine} height={400} alt="" />
                    <img src={Images.fridge} height={400} alt="" />
                    <img src={Images.sun_battery} height={400} alt="" />
                    <img src={Images.washing_machine} height={400} alt="" />
                </Carousel>
                <div className="home-page-content">
                    {skills.map((skill) => (
                        <div
                            className="home-page-content-item"
                            key={skill.skillId}
                        >
                            <h2 className="home-page-content-item-title">
                                {skill.name}
                            </h2>
                            {services.filter((s) => s.skillId === skill.skillId)
                                .length ? (
                                <div className="home-page-content-item-child">
                                    {services
                                        .filter(
                                            (s) => s.skillId === skill.skillId
                                        )
                                        .sort((a, b) => b.rate - a.rate)
                                        .slice(0, 4)
                                        .map((s) => (
                                            <Card
                                                hoverable
                                                style={{ width: 250 }}
                                                key={s.serviceId}
                                                cover={
                                                    <img
                                                        alt="card"
                                                        style={{
                                                            height: 250,
                                                            backgroundColor:
                                                                "#ccc",
                                                        }}
                                                        src={
                                                            s.image ||
                                                            Images.no_image
                                                        }
                                                    />
                                                }
                                            >
                                                <div className="card-title">
                                                    {s?.name}
                                                </div>
                                                <div className="card-value">
                                                    <div
                                                        style={{
                                                            marginBottom: 5,
                                                        }}
                                                    >
                                                        Giá:{" "}
                                                        <span
                                                            style={{
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {s.price} đ
                                                        </span>
                                                    </div>
                                                    {s.rate ? (
                                                        <Rate
                                                            value={s.rate}
                                                            disabled
                                                        />
                                                    ) : (
                                                        <div>
                                                            Không có đánh giá
                                                        </div>
                                                    )}
                                                </div>
                                            </Card>
                                        ))}
                                </div>
                            ) : (
                                <Empty />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Spin>
    );
};

export default HomePage;
