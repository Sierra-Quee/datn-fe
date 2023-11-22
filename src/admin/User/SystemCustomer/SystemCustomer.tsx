import "./SystemCustomer.scss";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";

import { Role } from "../../../core/auth/roles";
import {
    UserStatus,
    clearListCustomer,
    clearUpdateStatusUser,
    getAllUserRoleAsync,
    getDetailUserAsync,
    updateStatusUserAsync,
} from "../../../core/reducers/users";
import useDebounce from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IUser } from "../../../utils/model";
import { formatDate } from "../../../utils/functions/utils";
import { FORMAT_DATETIME } from "../../../utils/constants";
import { toast } from "react-toastify";
import UpdateUser from "../UpdateUser/UpdateUser";
import DetailUser from "../DetailUser/DetailUser";

const SystemCustomer = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [isOpenPanelUser, setIsOpenPanelUser] = useState<boolean>(false);
    const [isOpenPanelUpdate, setIsOpenPanelUpdate] = useState<boolean>(false);
    const [customerUpdate, setCustomerUpdate] = useState<
        IUser | null | undefined
    >();
    const [customers, setCustomers] = useState<IUser[]>([]);

    const dispatch = useAppDispatch();
    const { loadingUser, customerList, user } = useAppSelector(
        (state) => state.users
    );
    const { loadingUpdateUserStatus, updateStatusUserStatus } = useAppSelector(
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
    }, [customerList]);

    useEffect(() => {
        setCustomers([
            ...customerList.filter((r) =>
                r.firstName
                    .toLowerCase()
                    .includes((debounce as string)?.toLowerCase())
            ),
        ]);
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

    return (
        <Spin spinning={loadingUser || loadingUpdateUserStatus}>
            <div className="system-customer">
                <h2>Danh sách khách hàng</h2>
                <div className="header-table-customer">
                    <Button
                        type="primary"
                        onClick={() => setIsOpenPanelUpdate(!isOpenPanelUpdate)}
                    >
                        Thêm khách hàng
                    </Button>
                    <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Nhập tên khách hàng cần tìm kiếm"
                        onChange={handleFindCustomer}
                    />
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
                    pagination={{ pageSize: 7 }}
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
            </div>
        </Spin>
    );
};

export default SystemCustomer;
