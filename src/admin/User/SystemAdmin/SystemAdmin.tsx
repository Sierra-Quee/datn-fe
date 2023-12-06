import "./SystemAdmin.scss";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Switch } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

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
import { FORMAT_DATETIME } from "../../../utils/constants";
import { formatDate } from "../../../utils/functions/utils";
import { IUser } from "../../../utils/model";
import DetailUser from "../DetailUser/DetailUser";
import UpdateUser from "../UpdateUser/UpdateUser";

const SystemAdmin = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [isOpenPanelUser, setIsOpenPanelUser] = useState<boolean>(false);
    const [isOpenPanelUpdate, setIsOpenPanelUpdate] = useState<boolean>(false);
    const [adminUpdate, setAdminUpdate] = useState<IUser | null | undefined>();
    const [admins, setAdmins] = useState<IUser[]>([]);

    const dispatch = useAppDispatch();
    const { loadingUser, adminList, user } = useAppSelector(
        (state) => state.users
    );
    const { loadingUpdateUserStatus, updateStatusUserStatus } = useAppSelector(
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
    }, [adminList]);

    useEffect(() => {
        setAdmins([
            ...adminList.filter((r) =>
                r.firstName
                    .toLowerCase()
                    .includes((debounce as string)?.toLowerCase())
            ),
        ]);
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

    return (
        <Spin spinning={loadingUser || loadingUpdateUserStatus}>
            <div className="system-admin">
                <h2>Danh sách quản lý</h2>
                <div className="header-table-admin">
                    <Button
                        type="primary"
                        onClick={() => setIsOpenPanelUpdate(!isOpenPanelUpdate)}
                    >
                        Thêm quản lý
                    </Button>
                    <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Nhập tên quản lý cần tìm kiếm"
                        onChange={handleFindAdmin}
                    />
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
                    pagination={{ pageSize: 7 }}
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
            </div>
        </Spin>
    );
};

export default SystemAdmin;
