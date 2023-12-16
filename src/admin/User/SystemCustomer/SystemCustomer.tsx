import "./SystemCustomer.scss";

import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { read, utils, writeFile } from "xlsx";

import { Role } from "../../../core/auth/roles";
import {
    clearListCustomer,
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

const SystemCustomer = () => {
    const [fileName, setFileName] = useState<string>("");
    const [listCusExport, setListCusExport] = useState<any[]>([]);
    const [listCusAdd, setListCusAdd] = useState<any[] | null>(null);
    const [searchInput, setSearchInput] = useState<string>("");
    const [isOpenPanelUser, setIsOpenPanelUser] = useState<boolean>(false);
    const [isOpenPanelUpdate, setIsOpenPanelUpdate] = useState<boolean>(false);
    const [customerUpdate, setCustomerUpdate] = useState<
        IUser | null | undefined
    >();
    const [customers, setCustomers] = useState<IUser[]>([]);

    const dispatch = useAppDispatch();
    const { customerList, user } = useAppSelector((state) => state.users);
    const { updateStatusUserStatus } = useAppSelector(
        (state) => state.users.updateStatusUser
    );

    const debounce = useDebounce(searchInput);

    const handleGetAllCustomerList = useCallback(async () => {
        await dispatch(getAllUserRoleAsync(Role.ROLE_USER));
    }, []);

    useEffect(() => {
        handleGetAllCustomerList();

        return () => {
            dispatch(clearListCustomer());
        };
    }, []);

    useEffect(() => {
        if (updateStatusUserStatus === "success") {
            toast.success("Cập nhật trang thái thành công");
            dispatch(clearUpdateStatusUser());
            handleGetAllCustomerList();
        }
    }, [updateStatusUserStatus, dispatch]);

    useEffect(() => {
        setCustomers(customerList);
        setListCusExport(
            customerList.map((cus) => {
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
    }, [customerList]);

    useEffect(() => {
        setCustomers([
            ...customerList.filter((r) =>
                r.firstName
                    .toLowerCase()
                    .includes((debounce as string)?.toLowerCase())
            ),
        ]);
        setListCusExport(
            customerList
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

    const handleConfirmPanel = () => {
        setIsOpenPanelUser(false);
    };

    const openUpdateModal = (data: IUser) => {
        setIsOpenPanelUpdate(true);
        setCustomerUpdate(data);
    };

    const onChangeStatus = async (checked: boolean, customerId: string) => {
        await dispatch(updateStatusUserAsync(customerId));
    };

    const columns: ColumnsType<IUser> = [
        {
            title: "Mã khách hàng",
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

    const handleFindCustomer = (e: any) => {
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
        utils.sheet_add_json(ws, listCusExport, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "Danh sách khách hàng.xlsx");
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
                            role: Role.ROLE_USER,
                            gender: item["Giới tính"],
                            password: item["Mật khẩu"],
                            imageUrl: null,
                        };
                    });
                    setListCusAdd(listAddImport);
                    setFileName(file.name);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className="system-customer">
            <h2>Danh sách khách hàng</h2>
            <div className="header-table-customer">
                <div className="header-table-customer-wrap">
                    <Button
                        type="primary"
                        onClick={() => setIsOpenPanelUpdate(!isOpenPanelUpdate)}
                    >
                        Thêm khách hàng
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
                <div className="header-table-customer-wrap">
                    <Button
                        type="primary"
                        onClick={handleExport}
                        icon={<DownloadOutlined />}
                        disabled={!listCusExport || listCusExport.length === 0}
                    >
                        Xuất file excel
                    </Button>
                    <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Nhập tên khách hàng cần tìm kiếm"
                        onChange={handleFindCustomer}
                    />
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={customers.map((c) => {
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
                    currentUser={customerUpdate}
                    isCreate={!customerUpdate}
                    close={() => {
                        setCustomerUpdate(null);
                        setIsOpenPanelUpdate(!isOpenPanelUpdate);
                    }}
                    roleUpdate={Role.ROLE_USER}
                    handleGetAllUser={handleGetAllCustomerList}
                />
            )}

            {isOpenPanelUser && (
                <DetailUser
                    isOpenPanel={isOpenPanelUser}
                    handleConfirmPanel={handleConfirmPanel}
                    info={user}
                />
            )}

            {listCusAdd && listCusAdd.length && (
                <AddListUser
                    handleGetAllUser={handleGetAllCustomerList}
                    listUserAdd={listCusAdd}
                    close={() => {
                        setListCusAdd(null);
                    }}
                    fileName={fileName}
                />
            )}
        </div>
    );
};

export default SystemCustomer;
