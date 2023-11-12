import "./Home.scss";

import {
    GlobalOutlined,
    UngroupOutlined,
    UsergroupAddOutlined,
    UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect } from "react";

import {
    clearListService,
    getAllServiceAsync,
} from "../../core/reducers/service";
import { clearListSkill, getAllSkillAsync } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const Home = () => {
    const dispatch = useAppDispatch();

    const { listSkill, loadingSkill } = useAppSelector((state) => state.skill);
    const { listService, isLoadingService } = useAppSelector(
        (state) => state.service
    );

    useEffect(() => {
        handleGetAllSkillAsync();
        handleGetAllServiceAsync();

        return () => {
            dispatch(clearListService());
            dispatch(clearListSkill());
        };
    }, [dispatch]);

    const handleGetAllSkillAsync = async () => {
        await dispatch(getAllSkillAsync());
    };

    const handleGetAllServiceAsync = async () => {
        await dispatch(getAllServiceAsync());
    };

    return (
        <Spin spinning={loadingSkill || isLoadingService}>
            <div className="home">
                <div className="home-statistic">
                    <div className="home-statistic-item home-statistic-item-skill">
                        <span className="home-statistic-item-title">
                            <span>
                                <UngroupOutlined /> Số loại dịch vụ:
                            </span>
                            <div>{listSkill.length}</div>
                        </span>
                    </div>
                    <div className="home-statistic-item home-statistic-item-service">
                        <span className="home-statistic-item-title">
                            <span>
                                <GlobalOutlined /> Số dịch vụ:
                            </span>
                            <div>{listService.length}</div>
                        </span>
                    </div>
                    <div className="home-statistic-item home-statistic-item-customer">
                        <span className="home-statistic-item-title">
                            <span>
                                <UsergroupAddOutlined /> Số khách hàng:
                            </span>
                            <div>1128</div>
                        </span>
                    </div>
                    <div className="home-statistic-item home-statistic-item-employee">
                        <span className="home-statistic-item-title">
                            <span>
                                <UsergroupDeleteOutlined /> Số thợ:
                            </span>
                            <div>1128</div>
                        </span>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default Home;
