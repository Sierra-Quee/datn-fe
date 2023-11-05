import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Switch, Table } from "antd";
import { convertServiceType, formatDate } from "../../../utils/functions/utils";
import { FORMAT_DATETIME } from "../../../utils/constants";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import { IService, ITypeService } from "../../../utils/model";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import useDebounce from "../../../hooks/useDebounce";
import {
    clearListService,
    clearUpdateStatusService,
    deleteServiceAsync,
    getServiceBySkillIdAsync,
} from "../../../core/reducers/service";
import "./Service.scss";
import { clearSkill, getSkillByIdAsync } from "../../../core/reducers/skill";
import UpdateService from "./UpdateService/UpdateService";
import { toast } from "react-toastify";

const Service = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [serviceUpdate, setServiceUpdate] = useState<
        IService | null | undefined
    >();
    const [searchInput, setSearchInput] = useState<string>("");
    const [services, setServices] = useState<IService[]>([]);

    const params = useParams();
    const dispatch = useAppDispatch();
    const { listService, isLoadingService } = useAppSelector(
        (state) => state.service
    );
    const { loadingUpdateStatusService, updateStatusServiceStatus } =
        useAppSelector((state) => state.service.updateStatusService);
    const { skill, loadingSkill } = useAppSelector((state) => state.skill);

    const debounce = useDebounce(searchInput);

    useEffect(() => {
        handleGetAllServiceAsync();
        handleGetSkillSkillByIdAsync();

        return () => {
            dispatch(clearSkill());
            dispatch(clearListService());
        };
    }, []);

    useEffect(() => {
        if (updateStatusServiceStatus === "success") {
            toast.success("Cập nhật trang thái thành công");
            dispatch(clearUpdateStatusService());
            handleGetAllServiceAsync();
        }
    }, [updateStatusServiceStatus]);

    useEffect(() => {
        setServices(listService);
    }, [listService]);

    useEffect(() => {
        setServices(
            listService.filter((s) =>
                s.name.toLowerCase().includes(searchInput.toLowerCase())
            )
        );
    }, [debounce]);

    const handleGetAllServiceAsync = async () => {
        await dispatch(getServiceBySkillIdAsync(+(params.skillId as string)));
    };

    const handleGetSkillSkillByIdAsync = async () => {
        await dispatch(getSkillByIdAsync(+(params.skillId as string)));
    };

    const openUpdateModal = (data: IService) => {
        setIsOpenModal(!isOpenModal);
        setServiceUpdate(data);
    };

    const handleFindService = (e: any) => {
        setSearchInput(e.target.value);
    };

    const onChangeStatus = async (checked: boolean, serviceId: string) => {
        await dispatch(deleteServiceAsync(serviceId));
    };

    const columns: ColumnsType<IService> = [
        {
            title: "Mã",
            dataIndex: "serviceId",
            key: "serviceId",
            fixed: "left",
            width: 80,
        },
        {
            title: "Tên dịch vụ",
            dataIndex: "name",
            key: "name",
            fixed: "left",
            width: 150,
        },
        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Đánh giá",
            dataIndex: "rate",
            key: "rate",
        },
        {
            title: "Mô tả",
            dataIndex: "desc",
            key: "desc",
            width: 300,
        },
        {
            title: "Thời gian tạo",
            key: "createdAt",
            dataIndex: "createdAt",
        },
        {
            title: "Thời gian cập nhật",
            key: "createdAt",
            dataIndex: "createdAt",
        },
        {
            title: "Trạng thái",
            key: "isActive",
            dataIndex: "isActive",
            fixed: "right",
            width: 100,
            render: (_: any, record: IService) => (
                <Switch
                    checked={record.isActive}
                    onChange={(checked) =>
                        onChangeStatus(checked, record.serviceId)
                    }
                />
            ),
        },
        {
            title: "",
            key: "action",
            dataIndex: "",
            fixed: "right",
            width: 100,
            render: (_: any, record: IService) => (
                <div>
                    <a
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                            openUpdateModal(record);
                        }}
                    >
                        Cập nhật
                    </a>
                </div>
            ),
        },
    ];

    return (
        <Spin
            spinning={
                loadingSkill || isLoadingService || loadingUpdateStatusService
            }
        >
            <div className="service">
                <h2>Danh sách các dịch vụ của {skill?.name}</h2>
                <div className="header-table-service">
                    <Button
                        type="primary"
                        onClick={() => setIsOpenModal(!isOpenModal)}
                    >
                        Thêm dịch vụ
                    </Button>
                    <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Nhập tên dịch vụ cần tìm kiếm"
                        onChange={handleFindService}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={services.map((d) => {
                        return {
                            ...d,
                            key: d.serviceId,
                            createdAt: formatDate(d.createdAt, FORMAT_DATETIME),
                            updatedAt: formatDate(d.updatedAt, FORMAT_DATETIME),
                            type: convertServiceType(d.type as ITypeService),
                        };
                    })}
                    pagination={{ pageSize: 7 }}
                    scroll={{ x: 1300 }}
                />
                {isOpenModal && (
                    <UpdateService
                        isOpen={isOpenModal}
                        close={() => {
                            setServiceUpdate(null);
                            setIsOpenModal(!isOpenModal);
                        }}
                        serviceUpdate={serviceUpdate}
                        isCreate={!serviceUpdate}
                        handleGetAllServiceAsync={handleGetAllServiceAsync}
                        skillId={skill?.skillId as number}
                    />
                )}
            </div>
        </Spin>
    );
};

export default Service;
