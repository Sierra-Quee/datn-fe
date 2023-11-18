import "./SystemRepairment.scss";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";

import { Role } from "../../../core/auth/roles";
import {
    clearListRepair,
    getAllUserRoleAsync,
    getDetailUserAsync,
} from "../../../core/reducers/users";
import useDebounce from "../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IUser } from "../../../utils/model";
import { DetailUser } from "../DetailUser/DetailUser";
import { UpdateUser } from "../UpdateUser/UpdateUser";
import { clearListSkill, getAllSkillAsync } from "../../../core/reducers/skill";

const SystemRepairment = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [employeeUpdate, setEmployeeUpdate] = useState<
        IUser | null | undefined
    >();
    const [employees, setEmployees] = useState<IUser[]>([]);
    const [isOpenPanelUser, setIsOpenPanelUser] = useState<boolean>(false);
    const [isOpenPanelUpdate, setIsOpenPanelUpdate] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { listSkill, loadingSkill } = useAppSelector((state) => state.skill);
    const { loadingUser, repairList, user } = useAppSelector(
        (state) => state.users
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
        setEmployees(repairList);
    }, [repairList]);

    const openUpdateModal = (data: IUser) => {
        setIsOpenPanelUpdate(true);
        setEmployeeUpdate(data);
    };

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
                                  <div>
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

    return (
        <Spin spinning={loadingUser}>
            <div className="system-repair">
                <h2>Danh sách thợ</h2>
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
                        placeholder="Nhập tên thợ cần tìm kiếm"
                        onChange={handleFindRepair}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={employees}
                    pagination={{ pageSize: 7 }}
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
export default SystemRepairment;
