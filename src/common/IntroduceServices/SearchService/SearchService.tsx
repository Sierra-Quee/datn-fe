import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IService } from "../../../utils/model";
import {
    clearListService,
    getServiceByNameAsync,
} from "../../../core/reducers/service";

type Props = {};

const SearchService = (props: Props) => {
    const [services, setServices] = useState<IService[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const { listService } = useAppSelector((state) => state.service);
    const { skill } = useAppSelector((state) => state.skill);
    const handleGetServiceByName = async (name: string) => {
        await dispatch(getServiceByNameAsync(name));
    };
    useEffect(() => {
        const name = searchParams.get("name");
        if (name) {
            handleGetServiceByName(name);
        }

        return () => {
            dispatch(clearListService());
        };
    }, [searchParams]);
    useEffect(() => {
        setServices(listService.filter((service) => service.isActive));
    }, [listService]);
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

export default SearchService;
