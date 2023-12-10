import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {
    clearListMalfunction,
    clearMalfunction,
    getAllMalfunctionAsync,
} from "../../../core/reducers/malfunction";
import useDebounce from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IMalfunction } from "../../../utils/model";
import UpdateMalfunction from "./UpdateMalfuntion";

const Malfunction = () => {
    const dispatch = useAppDispatch();
    const [searchInput, setSearchInput] = useState<string>("");
    const { service } = useAppSelector((state) => state.service);
    const [malfunctionUpdate, setMalfunctionUpdate] = useState<
        IMalfunction | null | undefined
    >();
    const debounce = useDebounce(searchInput);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const { malfunctionList } = useAppSelector((state) => state.malfunction);
    const columns: ColumnsType<IMalfunction> = [
        {
            title: "Mã",
            dataIndex: "malFuncId",
            key: "malFuncId",
        },
        {
            title: "Sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            key: "price",
            dataIndex: "price",
        },
    ];

    const handleFindMalfunction = (e: any) => {
        setSearchInput(e.target.value);
    };
    useEffect(() => {
        handleGetAllMalfunction();
        return () => {
            dispatch(clearListMalfunction());
            dispatch(clearMalfunction());
        };
    }, []);

    const handleGetAllMalfunction = async () => {
        await dispatch(getAllMalfunctionAsync());
    };

    return (
        <div className="skill">
            <h2>Danh mục chi tiết</h2>
            <div className="header-table-skill">
                <Button
                    type="primary"
                    onClick={() => setIsOpenModal(!isOpenModal)}
                >
                    Thêm danh mục
                </Button>
                <Input
                    addonBefore={
                        <SearchOutlined style={{ fontSize: "20px" }} />
                    }
                    placeholder="Nhập tên danh mục sản phẩm cần tìm kiếm"
                    onChange={handleFindMalfunction}
                />
            </div>
            <Table
                columns={columns}
                dataSource={malfunctionList}
                pagination={{ pageSize: 7 }}
            />
            {isOpenModal && (
                <UpdateMalfunction
                    isOpen={isOpenModal}
                    close={() => {
                        // setServiceUpdate(null);
                        setIsOpenModal(!isOpenModal);
                    }}
                    malfunctionUpdate={malfunctionUpdate}
                    isCreate={!malfunctionUpdate}
                    handleGetAllMalfuntionAsync={handleGetAllMalfunction}
                    serviceId={service.detailService.serviceId}
                />
            )}
        </div>
    );
};

export default Malfunction;
