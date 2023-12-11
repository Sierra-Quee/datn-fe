import "./SystemRepairment.scss";

import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { read, utils, writeFile } from "xlsx";
import { Role } from "../../../core/auth/roles";
import { clearListSkill, getAllSkillAsync } from "../../../core/reducers/skill";
import {
    UserStatus,
    clearListRepair,
    clearUpdateStatusUser,
    getAllUserRoleAsync,
    getDetailUserAsync,
    updateStatusUserAsync,
} from "../../../core/reducers/users";
import useDebounce from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
    FORMAT_DATE,
    FORMAT_DATETIME,
    XLSX_TYPE,
    XLS_TYPE,
} from "../../../utils/constants";
import { formatDate, getStatusUser } from "../../../utils/functions/utils";
import { IUser } from "../../../utils/model";
import AddListUser from "../AddListUser/AddListUser";
import DetailUser from "../DetailUser/DetailUser";
import UpdateUser from "../UpdateUser/UpdateUser";

const SystemRepairment = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [employeeUpdate, setEmployeeUpdate] = useState<
        IUser | null | undefined
    >();
    const [fileName, setFileName] = useState<string>("");
    const [employees, setEmployees] = useState<IUser[]>([]);
    const [listRepExport, setListRepExport] = useState<any>(null);
    const [listRepAdd, setListRepAdd] = useState<any[] | null>(null);
    const [isOpenPanelUser, setIsOpenPanelUser] = useState<boolean>(false);
    const [isOpenPanelUpdate, setIsOpenPanelUpdate] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { listSkill } = useAppSelector((state) => state.skill);
    const { repairList, user } = useAppSelector((state) => state.users);
    const { updateStatusUserStatus } = useAppSelector(
        (state) => state.users.updateStatusUser
    );

    const debounce = useDebounce(searchInput);

    const handleGetAllRepairList = useCallback(async () => {
        await dispatch(getAllUserRoleAsync(Role.ROLE_REPAIRMAN));
    }, []);

    const handleGetAllSkillAsync = async () => {
        await dispatch(getAllSkillAsync());
    };

    useEffect(() => {
        handleGetAllRepairList();
        handleGetAllSkillAsync();

        return () => {
            dispatch(clearListRepair());
            dispatch(clearListSkill());
        };
    }, []);

    useEffect(() => {
        if (updateStatusUserStatus === "success") {
            toast.success("Cập nhật trang thái thành công");
            dispatch(clearUpdateStatusUser());
            handleGetAllRepairList();
        }
    }, [updateStatusUserStatus, dispatch]);

    useEffect(() => {
        setEmployees(repairList);
        setListRepExport(
            repairList.map((rep) => {
                return {
                    id: rep.userId,
                    accountName: rep.accountName,
                    firstName: rep.firstName,
                    lastName: rep.lastName,
                    gender: rep.gender ? "Nam" : "Nữ",
                    phone: rep.phone,
                    email: rep.email,
                    dob: formatDate(rep.dob, FORMAT_DATE),
                    createdDate: formatDate(rep.createdAt, FORMAT_DATETIME),
                    updatedDate: formatDate(rep.updatedAt, FORMAT_DATETIME),
                    status: getStatusUser(rep.status),
                };
            })
        );
    }, [repairList]);

    useEffect(() => {
        setEmployees([
            ...repairList.filter((r) =>
                r.firstName
                    .toLowerCase()
                    .includes((debounce as string)?.toLowerCase())
            ),
        ]);
    }, [debounce]);

    const openUpdateModal = (data: IUser) => {
        setIsOpenPanelUpdate(true);
        setEmployeeUpdate(data);
    };

    const onChangeStatus = async (checked: boolean, userIđ: string) => {
        await dispatch(updateStatusUserAsync(userIđ));
    };

    const handleConfirmPanel = () => {
        setIsOpenPanelUser(false);
    };
    const columns: ColumnsType<IUser> = [
        {
            title: "Mã thợ",
            dataIndex: "userId",
            key: "userId",
            fixed: "left",
            width: 120,
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
            title: "Kĩ năng",
            key: "skills",
            dataIndex: "skills",
            render: (_: any, record: IUser) => {
                return (
                    <div>
                        {record && record.skills && record.skills.length
                            ? record.skills.map((skill: any) => (
                                  <div key={skill.skillId}>
                                      {
                                          listSkill.find(
                                              (s) => s.skillId === skill.skillId
                                          )?.name
                                      }
                                  </div>
                              ))
                            : ""}
                    </div>
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
            key: "createdAt",
            dataIndex: "createdAt",
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            fixed: "right",
            width: 100,
            render: (_: any, record: IUser) => (
                <div>
                    {record.status === UserStatus.BUSY ? (
                        <span>Đang bận</span>
                    ) : (
                        <Switch
                            checked={record.status === UserStatus.ACTIVE}
                            onChange={(checked) =>
                                onChangeStatus(checked, record.userId)
                            }
                        />
                    )}
                </div>
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

    const handleFindRepair = (e: any) => {
        setSearchInput(e.target.value);
    };
    const handleExport = () => {
        const headings = [
            [
                "Mã thợ ",
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
        utils.sheet_add_json(ws, listRepExport, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "Danh sách thợ sửa chữa.xlsx");
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
                    setListRepAdd(listAddImport);
                    setFileName(file.name);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className="system-repair">
            <h2>Danh sách thợ</h2>
            <div className="header-table-repair">
                <Button
                    type="primary"
                    onClick={() => setIsOpenPanelUpdate(!isOpenPanelUpdate)}
                >
                    Thêm nhân viên
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
                        placeholder="Nhập tên thợ cần tìm kiếm"
                        onChange={handleFindRepair}
                    />
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={employees.map((e) => {
                    return {
                        ...e,
                        key: e.userId,
                        createdAt: formatDate(e.createdAt, FORMAT_DATETIME),
                        updatedAt: formatDate(e.updatedAt, FORMAT_DATETIME),
                    };
                })}
                pagination={{ pageSize: 6 }}
                scroll={{ x: 1300 }}
            />
            {isOpenPanelUpdate && (
                <UpdateUser
                    isOpenPanel={isOpenPanelUpdate}
                    currentUser={employeeUpdate}
                    isCreate={!employeeUpdate}
                    close={() => {
                        setEmployeeUpdate(null);
                        setIsOpenPanelUpdate(!isOpenPanelUpdate);
                    }}
                    handleGetAllUser={handleGetAllRepairList}
                    roleUpdate={Role.ROLE_REPAIRMAN}
                />
            )}

            {isOpenPanelUser && (
                <DetailUser
                    isOpenPanel={isOpenPanelUser}
                    handleConfirmPanel={handleConfirmPanel}
                    info={user}
                />
            )}
            {listRepAdd && listRepAdd.length && (
                <AddListUser
                    handleGetAllUser={handleGetAllRepairList}
                    listUserAdd={listRepAdd}
                    close={() => {
                        setListRepAdd(null);
                    }}
                    fileName={fileName}
                />
            )}
        </div>
    );
};
export default SystemRepairment;
