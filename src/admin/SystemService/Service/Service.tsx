import "./Service.scss";

import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { read, utils, writeFile } from "xlsx";

import {
    clearListService,
    clearUpdateStatusService,
    deleteServiceAsync,
    getDetailServiceAsync,
    getServiceBySkillIdAsync,
} from "../../../core/reducers/service";
import { clearSkill, getSkillByIdAsync } from "../../../core/reducers/skill";
import useDebounce from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { FORMAT_DATETIME, XLS_TYPE, XLSX_TYPE } from "../../../utils/constants";
import { convertServiceType, formatDate } from "../../../utils/functions/utils";
import { IService, ITypeService } from "../../../utils/model";
import AddListServices from "./AddListServices/AddListServices";
import DetailService from "./DetailService/DetailService";
import UpdateService from "./UpdateService/UpdateService";

const Service = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenPanelService, setIsOpenPanelService] =
        useState<boolean>(false);
    const [serviceUpdate, setServiceUpdate] = useState<
        IService | null | undefined
    >();
    const [searchInput, setSearchInput] = useState<string>("");
    const [services, setServices] = useState<IService[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [listServiceExport, setListServiceExport] = useState<any>(null);
    const [listServiceAdd, setListServiceAdd] = useState<any[] | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("skillId"));

    const dispatch = useAppDispatch();
    const { listService, service } = useAppSelector((state) => state.service);
    const { updateStatusServiceStatus } = useAppSelector(
        (state) => state.service.updateStatusService
    );
    const { skill } = useAppSelector((state) => state.skill);

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
        setListServiceExport(
            listService.map((ser) => {
                return {
                    id: ser.serviceId,
                    name: ser.name,
                    type: ser.type,
                    price: ser.price,
                    rate: ser.rate,
                    desc: ser.desc,
                    image: ser.image,
                    createdDate: formatDate(ser.createdAt, FORMAT_DATETIME),
                    updatedDate: formatDate(ser.updatedAt, FORMAT_DATETIME),
                    isActive: ser.isActive,
                };
            })
        );
    }, [listService]);

    useEffect(() => {
        setServices(
            listService.filter((s) =>
                s.name.toLowerCase().includes(searchInput.toLowerCase())
            )
        );
    }, [debounce]);
    const handleExport = () => {
        const headings = [
            [
                "Mã dịch vụ",
                "Tên dịch vụ",
                "Loại dịch vụ",
                "Giá",
                "Đánh giá",
                "Hình ảnh",
                "Mô tả",
                "Thời gian tạo",
                "Thời gian cập nhật",
                "Trạng thái",
            ],
        ];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        ws["!cols"] = [
            { wch: 15 },
            { wch: 18 },
            { wch: 10 },
            { wch: 15 },
            { wch: 10 },
            { wch: 12 },
            { wch: 20 },
            { wch: 18 },
            { wch: 20 },
            { wch: 15 },
        ]; // set column A width to 10 characters
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listServiceExport, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "Danh sách dịch vụ.xlsx");
        toast.success("Xuất file thành công");
    };
    const handleAddByImport = ($event: any) => {
        const files = $event.target.files;

        if (files && files.length) {
            const file = files[0];

            if (file.type !== XLSX_TYPE && file.type !== XLS_TYPE) {
                toast.error("File phải có định dạng xlsx, xls");
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target!.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    // console.log(rows);
                    const listAddImport = rows.map((item: any) => {
                        return {
                            name: item["Tên dịch vụ"],
                            type: item["Loại dịch vụ"],
                            price: item["Giá"],
                            rate: item["Đánh giá"],
                            desc: item["Mô tả"] || "",
                            createdAt: item["Thời gian tạo"],
                            updatedAt: item["Thời gian cập nhật"],
                            isActive: item["Trạng thái"],
                            image: "",
                        };
                    });
                    setListServiceAdd(listAddImport);
                    setFileName(file.name);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleGetAllServiceAsync = async () => {
        await dispatch(getServiceBySkillIdAsync(+(query as string)));
    };

    const handleGetSkillSkillByIdAsync = async () => {
        await dispatch(getSkillByIdAsync(+(query as string)));
    };

    const openUpdateModal = (data: IService) => {
        setIsOpenModal(!isOpenModal);
        setServiceUpdate({
            ...data,
            // type: Object.entries(ITypeService).find(
            //     (o) => o[1] === data.type
            // )![0],
        });
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
            render: (_: any, record: IService) => {
                return (
                    <div>
                        <div
                            style={{
                                textDecoration: "solid underline",
                                cursor: "pointer",
                                width: "fit-content",
                            }}
                            onClick={() => {
                                setIsOpenPanelService(true);
                                dispatch(
                                    getDetailServiceAsync(
                                        +(record.serviceId as string)
                                    )
                                );
                            }}
                        >
                            {record.name}
                        </div>
                    </div>
                );
            },
        },
        {
            title: "Loại dịch vụ",
            dataIndex: "type",
            key: "type",
            render: (_: any, record: IService) => (
                <div>{convertServiceType(record.type as ITypeService)}</div>
            ),
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
            width: 200,
        },
        {
            title: "Danh mục chi tiết",
            key: "detailList",
            width: 100,
            render: (_: any, record: any) => {
                return (
                    <Link
                        style={{
                            textDecoration: "solid underline",
                            cursor: "pointer",
                            width: "fit-content",
                        }}
                        key={record.serviceId}
                        to={`/admin/malfunction/service?serviceId=${record.serviceId}`}
                    >
                        Danh mục chi tiết
                    </Link>
                );
            },
        },
        {
            title: "Thời gian tạo",
            key: "createdAt",
            dataIndex: "createdAt",
        },
        {
            title: "Thời gian cập nhật",
            key: "updatedAt",
            dataIndex: "updatedAt",
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

    const handleConfirmPanel = () => {
        setIsOpenPanelService(false);
    };

    return (
        <div className="service">
            <h2>Danh sách các dịch vụ của {skill?.name}</h2>
            <div className="header-table-service">
                <div className="header-table-service-left">
                    <Button
                        type="primary"
                        onClick={() => setIsOpenModal(!isOpenModal)}
                    >
                        Thêm dịch vụ
                    </Button>
                    <div className="button-upload">
                        <input
                            type="file"
                            name="file"
                            className="custom-file-input"
                            id="inputGroupFile"
                            required
                            hidden
                            onClick={(e: any) => (e.target.value = null)}
                            onChange={handleAddByImport}
                        />
                        <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile"
                        >
                            Thêm bằng file excel
                        </label>
                    </div>
                </div>
                <div className="header-table-service-right">
                    <Button
                        type="primary"
                        onClick={handleExport}
                        icon={<DownloadOutlined />}
                    >
                        Xuất file excel
                    </Button>
                    <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Nhập tên dịch vụ cần tìm kiếm"
                        onChange={handleFindService}
                    />
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={services.map((d) => {
                    return {
                        ...d,
                        key: d.serviceId,
                        createdAt: formatDate(d.createdAt, FORMAT_DATETIME),
                        updatedAt: formatDate(d.updatedAt, FORMAT_DATETIME),
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
            {isOpenPanelService && (
                <DetailService
                    isOpenPanel={isOpenPanelService}
                    handleConfirmPanel={handleConfirmPanel}
                    info={service.detailService}
                />
            )}
            {listServiceAdd && listServiceAdd.length && (
                <AddListServices
                    handleGetAllService={handleGetAllServiceAsync}
                    listAdd={listServiceAdd}
                    close={() => {
                        setListServiceAdd(null);
                    }}
                    fileName={fileName}
                    skillId={skill?.skillId as number}
                />
            )}
        </div>
    );
};

export default Service;
