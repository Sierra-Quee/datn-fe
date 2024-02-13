import "./SystemAdmin.scss";

import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Switch } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { read, utils, writeFile } from "xlsx";

import { Role } from "../../../core/auth/roles";
import {
    clearListAdmin,
    clearUpdateStatusUser,
    getAllUserRoleAsync,
    getDetailUserAsync,
    updateStatusUserAsync,
    UserStatus,
} from "../../../core/reducers/users";
import useDebounce from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
    FORMAT_DATE,
    FORMAT_DATETIME,
    XLS_TYPE,
    XLSX_TYPE,
} from "../../../utils/constants";
import { formatDate, getStatusUser } from "../../../utils/functions/utils";
import { IUser } from "../../../utils/model";
import AddListUser from "../AddListUser/AddListUser";
import DetailUser from "../DetailUser/DetailUser";
import UpdateUser from "../UpdateUser/UpdateUser";

const SystemAdmin = () => {
    const [fileName, setFileName] = useState<string>("");
    const [listAdExport, setListAdExport] = useState<any[]>([]);
    const [listAdAdd, setListAdAdd] = useState<any[] | null>(null);
    const [searchInput, setSearchInput] = useState<string>("");
    const [isOpenPanelUser, setIsOpenPanelUser] = useState<boolean>(false);
    const [isOpenPanelUpdate, setIsOpenPanelUpdate] = useState<boolean>(false);
    const [adminUpdate, setAdminUpdate] = useState<IUser | null | undefined>();
    const [admins, setAdmins] = useState<IUser[]>([]);

    const dispatch = useAppDispatch();
    const { adminList, user } = useAppSelector((state) => state.users);
    const { updateStatusUserStatus } = useAppSelector(
        (state) => state.users.updateStatusUser
    );

    const debounce = useDebounce(searchInput);

    const handleGetAllAdminList = useCallback(async () => {
        await dispatch(getAllUserRoleAsync(Role.ROLE_STAFF));
    }, []);

    useEffect(() => {
        handleGetAllAdminList();

        return () => {
            dispatch(clearListAdmin());
        };
    }, [dispatch]);

    useEffect(() => {
        setAdmins(adminList);
        setListAdExport(
            adminList.map((cus) => {
                return {
                    id: cus.userId,
                    accountName: cus.accountName,
                    firstName: cus.firstName,
                    lastName: cus.lastName,
                    gender: cus.gender ? "Nam" : "Nữ",
                    phone: cus.phone,
                    email: cus.email,
                    dob: formatDate(cus.dob, FORMAT_DATE),
                    createdDate: formatDate(cus.createdAt, FORMAT_DATETIME),
                    updatedDate: formatDate(cus.updatedAt, FORMAT_DATETIME),
                    status: getStatusUser(cus.status),
                };
            })
        );
    }, [adminList]);

    useEffect(() => {
        setAdmins([
            ...adminList.filter((r) =>
                r.firstName
                    .toLowerCase()
                    .includes((debounce as string)?.toLowerCase())
            ),
        ]);
        setListAdExport(
            adminList
                .filter((r) =>
                    r.firstName
                        .toLowerCase()
                        .includes((debounce as string)?.toLowerCase())
                )
                .map((cus) => {
                    return {
                        id: cus.userId,
                        accountName: cus.accountName,
                        firstName: cus.firstName,
                        lastName: cus.lastName,
                        gender: cus.gender ? "Nam" : "Nữ",
                        phone: cus.phone,
                        email: cus.email,
                        dob: formatDate(cus.dob, FORMAT_DATE),
                        createdDate: formatDate(cus.createdAt, FORMAT_DATETIME),
                        updatedDate: formatDate(cus.updatedAt, FORMAT_DATETIME),
                        status: getStatusUser(cus.status),
                    };
                })
        );
    }, [debounce]);

    useEffect(() => {
        if (updateStatusUserStatus === "success") {
            toast.success("Cập nhật trang thái thành công");
            dispatch(clearUpdateStatusUser());
            handleGetAllAdminList();
        }
    }, [updateStatusUserStatus, dispatch]);

    const handleConfirmPanel = () => {
        setIsOpenPanelUser(false);
    };

    const openUpdateModal = (data: IUser) => {
        setIsOpenPanelUpdate(true);
        setAdminUpdate(data);
    };

    const onChangeStatus = async (checked: boolean, userId: string) => {
        await dispatch(updateStatusUserAsync(userId));
    };

    const columns: ColumnsType<IUser> = [
        {
            title: "Mã quản lý",
            dataIndex: "userId",
            key: "userId",
            fixed: "left",
            width: 150,
        },
        {
            title: "Tên tài khoản",
            dataIndex: "accountName",
            key: "accountName",
            fixed: "left",
            width: 150,
            render: (_: any, record: IUser) => {
                return (
                    <div>
                        <div
                            style={{
                                textDecoration: "solid underline",
                                cursor: "pointer",
                                width: "fit-content",
                            }}
                            onClick={() => {
                                setIsOpenPanelUser(true);
                                dispatch(getDetailUserAsync(record.userId));
                            }}
                        >
                            {record.accountName}
                        </div>
                    </div>
                );
            },
        },
        {
            title: "Họ",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Tên",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            render: (_: any, record: IUser) => (
                <div>{record.gender ? "Nam" : "Nữ"}</div>
            ),
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
            render: (_: any, record: IUser) => (
                <Switch
                    checked={record.status === UserStatus.ACTIVE}
                    onChange={(checked) =>
                        onChangeStatus(checked, record.userId)
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
            render: (_: any, record: IUser) => (
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

    const handleFindAdmin = (e: any) => {
        setSearchInput(e.target.value);
    };

    const handleExport = () => {
        const headings = [
            [
                "Mã khách hàng",
                "Tên tài khoản",
                "Họ",
                "Tên",
                "Giới tính",
                "Số điện thoại",
                "Email",
                "Ngày tháng năm sinh",
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
            { wch: 20 },
            { wch: 15 },
        ]; // set column A width to 10 characters
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listAdExport, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "Danh sách quản lý.xlsx");
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
                    console.log(rows);
                    const listAddImport = rows.map((item: any) => {
                        return {
                            firstName: item["Tên"],
                            lastName: item["Họ"],
                            dob: item["Ngày tháng năm sinh"],
                            phone: item["Số điện thoại"],
                            email: item["Email"],
                            role: Role.ROLE_STAFF,
                            gender: item["Giới tính"],
                            password: item["Mật khẩu"],
                            imageUrl: null,
                        };
                    });
                    setListAdAdd(listAddImport);
                    setFileName(file.name);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className="system-admin">
            <h2>Danh sách quản lý</h2>
            <div className="header-table-admin">
                <div className="header-table-admin-wrap">
                    <Button
                        type="primary"
                        onClick={() => setIsOpenPanelUpdate(!isOpenPanelUpdate)}
                        style={{ background: "#435585" }}
                    >
                        Thêm quản lý
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
                <div className="header-table-admin-wrap">
                    <Button
                        type="primary"
                        onClick={handleExport}
                        icon={<DownloadOutlined />}
                        disabled={!listAdExport || listAdExport.length === 0}
                        style={{ background: "#435585" }}
                    >
                        Xuất file excel
                    </Button>
                    <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Nhập tên quản lý cần tìm kiếm"
                        onChange={handleFindAdmin}
                    />
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={admins.map((c) => {
                    return {
                        ...c,
                        key: c.userId,
                        createdAt: formatDate(c.createdAt, FORMAT_DATETIME),
                        updatedAt: formatDate(c.updatedAt, FORMAT_DATETIME),
                    };
                })}
                pagination={{ pageSize: 6 }}
                scroll={{ x: 1300 }}
            />
            {isOpenPanelUpdate && (
                <UpdateUser
                    isOpenPanel={isOpenPanelUpdate}
                    currentUser={adminUpdate}
                    isCreate={!adminUpdate}
                    close={() => {
                        setAdminUpdate(null);
                        setIsOpenPanelUpdate(!isOpenPanelUpdate);
                    }}
                    roleUpdate={Role.ROLE_STAFF}
                    handleGetAllUser={handleGetAllAdminList}
                />
            )}

            {isOpenPanelUser && (
                <DetailUser
                    isOpenPanel={isOpenPanelUser}
                    handleConfirmPanel={handleConfirmPanel}
                    info={user}
                />
            )}

            {listAdAdd && listAdAdd.length && (
                <AddListUser
                    handleGetAllUser={handleGetAllAdminList}
                    listUserAdd={listAdAdd}
                    close={() => {
                        setListAdAdd(null);
                    }}
                    fileName={fileName}
                />
            )}
        </div>
    );
};

export default SystemAdmin;
