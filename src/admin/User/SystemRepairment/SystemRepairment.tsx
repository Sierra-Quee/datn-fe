import "./SystemRepairment.scss";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Role } from "../../../core/auth/roles";
import { clearListSkill, getAllSkillAsync } from "../../../core/reducers/skill";
import {
    clearListRepair,
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
    const { loadingUpdateUserStatus, updateStatusUserStatus } = useAppSelector(
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

    return (
        <Spin spinning={loadingUser || loadingSkill || loadingUpdateUserStatus}>
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
                    dataSource={employees.map((e) => {
                        return {
                            ...e,
                            key: e.userId,
                            createdAt: formatDate(e.createdAt, FORMAT_DATETIME),
                            updatedAt: formatDate(e.updatedAt, FORMAT_DATETIME),
                        };
                    })}
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
            </div>
        </Spin>
    );
};
export default SystemRepairment;