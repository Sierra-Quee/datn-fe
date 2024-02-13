import "./IntroduceServices.scss";

import { Button, Card, Empty, Modal, Rate, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Images from "../../assets/Images";
import {
    clearListService,
    getServiceBySkillIdAsync,
} from "../../core/reducers/service";
import { clearSkill, getSkillByIdAsync } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IService } from "../../utils/model";
import ServiceCard from "./ServiceCard/ServiceCard";

const IntroduceServices = () => {
    const [services, setServices] = useState<IService[]>([]);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isOrder, setIsOrder] = useState<boolean>(false);

    const params = useParams();
    const dispatch = useAppDispatch();
    const { listService } = useAppSelector((state) => state.service);
    const { skill } = useAppSelector((state) => state.skill);

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
    const showModal = () => {
        setIsOpenModal(true);
    };

    const handleOk = () => {
        setIsOpenModal(false);
    };
    const handleCancel = () => {
        setIsOpenModal(false);
    };
    const showModalOrder = () => {
        setIsOrder(true);
    };

    return (
        <>
            <div className="introduce-services">
                <h2 className="introduce-services-title">{skill?.name}</h2>
                <div className="introduce-services-content">
                    {(services && services.length === 0) || !services ? (
                        <Empty />
                    ) : (
                        services.map((service) => {
                            return (
                                <ServiceCard
                                    service={service}
                                    key={service.serviceId}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default IntroduceServices;
