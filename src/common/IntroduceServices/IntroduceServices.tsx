import "./IntroduceServices.scss";

import { Button, Card, Modal, Rate, Spin, message } from "antd";
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
                        <div>Không có dữ liệu nào</div>
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
                                            <div>
                                                <Rate
                                                    value={service.rate}
                                                    disabled
                                                />

                                                <span className="ant-rate-text">
                                                    {service.rate}
                                                </span>
                                            </div>
                                        ) : (
                                            <div>Không có đánh giá</div>
                                        )}
                                        <div className="footer-card">
                                            <Button
                                                type="dashed"
                                                block
                                                onClick={showModal}
                                                className="button-card-service"
                                            >
                                                Chọn
                                            </Button>
                                            <Modal
                                                title="ISmart.com says"
                                                open={isOpenModal}
                                                onOk={handleOk}
                                                onCancel={handleCancel}
                                                footer={(_, { OkBtn }) => (
                                                    <div className="button-service">
                                                        <OkBtn />
                                                    </div>
                                                )}
                                            >
                                                <p>
                                                    Cảm ơn quý khác đã lựa chọn
                                                    dịch vụ, vui lòng vào giỏ
                                                    hàng để hoàn tất đặt hàng
                                                </p>
                                            </Modal>
                                            <Button
                                                type="primary"
                                                onClick={showModalOrder}
                                                className="button-card-service-set"
                                            >
                                                Đặt dịch vụ
                                            </Button>
                                            {/* {isOrder && <OrderService />} */}
                                        </div>
                                    </div>
                                </Card>
                                // </Link>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default IntroduceServices;
