import { Button, Card, Input, Spin, Switch, Table } from "antd";
import { useCallback, useEffect, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Images from "../../../assets/Images";
import { Role } from "../../../core/auth/roles";
import {
    getAllUserRoleAsync,
    getDetailUserAsync,
    setRepairList,
} from "../../../core/reducers/users";
import useDebounce from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { ColumnsType } from "antd/es/table";
import { IUser } from "../../../utils/model";
import { DetailUser } from "../DetailUser";
import { UpdateUser } from "../UpdateUser";

const SystemRepairment = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [isOpenPanelUser, setIsOpenPanelUser] = useState<boolean>(false);
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { loadingUser, repairList, user } = useAppSelector(
        (state) => state.users
    );

    const debounce = useDebounce(searchInput);
    const [isOpenPanelUpdate, setIsOpenPanelUpdate] = useState<boolean>(false);

    const handleGetAllRepairList = useCallback(async () => {
        const res = await dispatch(getAllUserRoleAsync(Role.ROLE_REPAIRMAN));
        if (res.payload) {
            dispatch(setRepairList(res.payload));
        }
    }, []);
    useEffect(() => {
        handleGetAllRepairList();
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
    const onGetStatusRepair = (status: number) => {
        if (status === 0) return "Đang hoạt động";
        if (status === 1) return "Đang bận";
        if (status === 2) return "Không hoạt động";
    };
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
            title: "Kĩ năng",
            key: "skills",
            dataIndex: "skills",
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            fixed: "right",
            width: 100,
            render: (_: any, record: IUser) => (
                <div>{onGetStatusRepair(record?.status)}</div>
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
                            setIsOpenPanelUpdate(true);
                            // openUpdatePanelUpdate(record);
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

    return (
        <div className="system-repair">
            <Spin spinning={loadingUser}>
                <div className="header-table-repair">
                    <Button
                        type="primary"
                        onClick={() => setIsOpenPanelUpdate(!isOpenPanelUpdate)}
                    >
                        Thêm nhân viên
                    </Button>
                    <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Nhập tên nhân viên cần tìm kiếm"
                        onChange={handleFindRepair}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={repairList}
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
export default SystemRepairment;
