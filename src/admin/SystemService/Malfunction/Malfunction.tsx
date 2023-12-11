import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { read, utils, writeFile } from "xlsx";
import {
    clearListMalfunction,
    clearMalfunction,
    getAllMalfunctionAsync,
} from "../../../core/reducers/malfunction";
import useDebounce from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IMalfunction } from "../../../utils/model";
import UpdateMalfunction from "./UpdateMalfuntion";
import { toast } from "react-toastify";
import { XLSX_TYPE, XLS_TYPE } from "../../../utils/constants";

const Malfunction = () => {
    const dispatch = useAppDispatch();
    const [searchInput, setSearchInput] = useState<string>("");
    const [malfunction, setMalfunction] = useState<IMalfunction[]>([]);
    const { service } = useAppSelector((state) => state.service);
    const [fileName, setFileName] = useState<string>("");
    const [listMalExport, setListMalExport] = useState<any>(null);
    const [listMalAdd, setListMalAdd] = useState<any[] | null>(null);
    const [malfunctionUpdate, setMalfunctionUpdate] = useState<
        IMalfunction | null | undefined
    >();
    const debounce = useDebounce(searchInput);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const { malfunctionList } = useAppSelector((state) => state.malfunction);
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("serviceId"));
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
    useEffect(() => {
        setMalfunction(malfunctionList);
        setListMalExport(
            malfunctionList.map((mal) => {
                return {
                    malFuncId: mal.malFuncId,
                    name: mal.name,
                    price: mal.price,
                };
            })
        );
    }, [malfunctionList]);

    const handleGetAllMalfunction = async () => {
        await dispatch(getAllMalfunctionAsync());
    };
    const handleExport = () => {
        const headings = [["Mã danh mục", "Tên danh mục", "Giá"]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        ws["!cols"] = [{ wch: 15 }, { wch: 18 }, { wch: 10 }]; // set column A width to 10 characters
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listMalExport, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "Danh sách danh mục chi tiết.xlsx");
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
                            name: item["Tên"],
                            price: item["Giá"],
                        };
                    });
                    setListMalAdd(listAddImport);
                    setFileName(file.name);
                }
            };
            reader.readAsArrayBuffer(file);
        }
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
                <div className="header-table-customer-wrap">
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
                        placeholder="Nhập tên danh mục sản phẩm cần tìm kiếm"
                        onChange={handleFindMalfunction}
                    />
                </div>
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
                    serviceId={query ?? ""}
                />
            )}
            {/* {listMalAdd && listMalAdd.length && (
                <AddListUser
                    handleGetAllUser={handleGetAllRepairList}
                    listUserAdd={listMalAdd}
                    close={() => {
                        setListMalAdd(null);
                    }}
                    fileName={fileName}
                />
            )} */}
        </div>
    );
};

export default Malfunction;