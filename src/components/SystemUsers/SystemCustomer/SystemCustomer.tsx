import { Button, Input, Spin, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import "./SystemCustomer.scss";

import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Role } from "../../../core/auth/roles";
import {
    getAllUserRoleAsync,
    getDetailUserAsync,
} from "../../../core/reducers/users";
import useDebounce from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IUser } from "../../../utils/model";
import { DetailUser } from "../DetailUser/DetailUser";
import { UpdateUser } from "../UpdateUser/UpdateUser";
export const SystemCustomer = () => {
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

    const debounce = useDebounce(searchInput);

    const handleGetAllCustomerList = useCallback(async () => {
        await dispatch(getAllUserRoleAsync(Role.ROLE_USER));
    }, []);
    useEffect(() => {
        handleGetAllCustomerList();
    }, []);

    useEffect(() => {
        setCustomers(customerList);
    }, [customerList]);

    const handleConfirmPanel = () => {
        setIsOpenPanelUser(false);
    };

    const openUpdateModal = (data: IUser) => {
        setIsOpenPanelUpdate(true);
        setCustomerUpdate(data);
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
        <Spin spinning={loadingUser}>
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
                    dataSource={customers}
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
                        isCustomer
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
