import "./IntroduceServices.scss";

import { Card, Rate, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Images from "../../assets/Images";
import {
    clearListService,
    getServiceBySkillIdAsync,
} from "../../core/reducers/service";
import { clearSkill, getSkillByIdAsync } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IService } from "../../utils/model";

const IntroduceServices = () => {
    const [services, setServices] = useState<IService[]>([]);

    const params = useParams();
    const dispatch = useAppDispatch();
    const { listService, isLoadingService } = useAppSelector(
        (state) => state.service
    );
    const { skill, loadingSkill } = useAppSelector((state) => state.skill);

    useEffect(() => {
        handleGetAllServiceAsync();
        handleGetSkillSkillByIdAsync();

        return () => {
            dispatch(clearSkill());
            dispatch(clearListService());
        };
    }, [params, dispatch]);

    useEffect(() => {
        setServices([...listService.filter((service) => service.isActive)]);
    }, [listService]);

    const handleGetAllServiceAsync = async () => {
        await dispatch(getServiceBySkillIdAsync(+(params.skillId as string)));
    };

    const handleGetSkillSkillByIdAsync = async () => {
        await dispatch(getSkillByIdAsync(+(params.skillId as string)));
    };

    return (
        <Spin spinning={isLoadingService || loadingSkill}>
            <div className="introduce-services">
                <h2 className="introduce-services-title">{skill?.name}</h2>
                <div className="introduce-services-content">
                    {(services && services.length === 0) || !services ? (
                        <div>Không có dữ liệu nào</div>
                    ) : (
                        services.map((service) => {
                            return (
                                // <Link
                                //     key={service.serviceId}
                                //     to={`service/${service.serviceId}`}
                                // >
                                <Card
                                    hoverable
                                    style={{ width: 250 }}
                                    key={service.serviceId}
                                    cover={
                                        <img
                                            alt="card"
                                            style={{
                                                height: 250,
                                                backgroundColor: "#ccc",
                                            }}
                                            src={
                                                service.image || Images.no_image
                                            }
                                        />
                                    }
                                >
                                    <div className="card-title">
                                        {service?.name}
                                    </div>
                                    <div className="card-value">
                                        <div style={{ marginBottom: 5 }}>
                                            Giá:{" "}
                                            <span
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {service.price} đ
                                            </span>
                                        </div>
                                        {service.rate ? (
                                            <Rate
                                                value={service.rate}
                                                disabled
                                            />
                                        ) : (
                                            <div>Không có đánh giá</div>
                                        )}
                                    </div>
                                </Card>
                                // </Link>
                            );
                        })
                    )}
                </div>
            </div>
        </Spin>
    );
};

export default IntroduceServices;
