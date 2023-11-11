import { Button, Input, Spin, Table } from "antd";
import { useCallback, useEffect, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Role } from "../../../core/auth/roles";
import {
    getAllUserRoleAsync,
    getDetailUserAsync,
    setCustomerList,
} from "../../../core/reducers/users";
import useDebounce from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IUser } from "../../../utils/model";
import { DetailUser } from "../DetailUser";
import { UpdateUser } from "../UpdateUser";
export const SystemCustomer = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [isOpenPanelUser, setIsOpenPanelUser] = useState<boolean>(false);
    const [isOpenPanelUpdate, setIsOpenPanelUisOpenPanelUpdate] =
        useState<boolean>(false);
    const [isCreate, setIsCreate] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { loadingUser, customerList, user } = useAppSelector(
        (state) => state.users
    );

    const debounce = useDebounce(searchInput);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handleGetAllCustomerList = useCallback(async () => {
        const res = await dispatch(getAllUserRoleAsync(Role.ROLE_USER));
        if (res.payload) {
            dispatch(setCustomerList(res.payload));
        }
    }, []);
    useEffect(() => {
        handleGetAllCustomerList();
    }, []);

    // useEffect(() => {
    //     setSkills(listSkill);
    // }, [listSkill]);

    // useEffect(() => {
    //     setSkills(
    //         listSkill.filter((s) =>
    //             s.name.toLowerCase().includes(searchInput.toLowerCase())
    //         )
    //     );
    // }, [debounce]);

    // const handleGetAllSkillAsync = async () => {
    //     await dispatch(getAllSkillAsync());
    // };
    const handleConfirmPanel = () => {
        setIsOpenPanelUser(false);
    };
    const columns: ColumnsType<IUser> = [
        {
            title: "Mã",
            dataIndex: "userId",
            key: "userId",
            fixed: "left",
            width: 120,
        },
        {
            title: "Tên taì khoản",
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
                        // onClick={() => {
                        //     openUpdateModal(record);
                        // }}
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
        <div className="system-customer">
            <Spin spinning={loadingUser}>
                <div className="header-table-customer">
                    <Button
                        type="primary"
                        onClick={() => setIsOpenModal(!isOpenModal)}
                    >
                        Thêm khách hàng
                    </Button>
                    <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Nhập tên nhân viên cần tìm kiếm"
                        onChange={handleFindCustomer}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={customerList}
                    pagination={{ pageSize: 7 }}
                    scroll={{ x: 1300 }}
                />
                <UpdateUser
                    isOpenPanel={isOpenPanelUpdate}
                    currentUser={user}
                    isCreate={isCreate}
                />
                {isOpenPanelUser && (
                    <DetailUser
                        isOpenPanel={isOpenPanelUser}
                        handleConfirmPanel={handleConfirmPanel}
                        info={user}
                    />
                )}
            </Spin>
        </div>
    );
};
