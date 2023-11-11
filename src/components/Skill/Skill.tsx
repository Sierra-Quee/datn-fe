import { ISkill } from "../../utils/model";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect, useState } from "react";
import {
    clearUpdateStatusSkill,
    getAllSkillAsync,
    getSkillByIdAsync,
    updateStatusSkillAsync,
} from "../../core/reducers/skill";
import Table, { ColumnsType } from "antd/es/table";
import { Button, Input, Modal, Spin, Switch } from "antd";
import "./Skill.scss";
import { SearchOutlined } from "@ant-design/icons";
import UpdateSkill from "./UpdateSkill/UpdateSkill";
import { formatDate } from "../../utils/functions/utils";
import { FORMAT_DATETIME } from "../../utils/constants";
import useDebounce from "../../hooks/useDebounce";
import { toast } from "react-toastify";
import { DetailSkill } from "./DetailSkill";

export const Skill = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenPanelSkill, setIsOpenPanelSkill] = useState<boolean>(false);
    const [skillUpdate, setSkillUpdate] = useState<ISkill | null | undefined>();
    const [searchInput, setSearchInput] = useState<string>("");
    const [skills, setSkills] = useState<ISkill[]>([]);

    const dispatch = useAppDispatch();

    const { listSkill, loadingSkill, skill } = useAppSelector(
        (state) => state.skill
    );

    const { loadingUpdateStatusSkill, updateStatusSkillStatus } =
        useAppSelector((state) => state.skill.updateStatusSkill);

    const debounce = useDebounce(searchInput);

    useEffect(() => {
        handleGetAllSkillAsync();
    }, []);

    useEffect(() => {
        if (updateStatusSkillStatus === "success") {
            toast.success("Cập nhật trang thái thành công");
            dispatch(clearUpdateStatusSkill());
            handleGetAllSkillAsync();
        }
    }, [updateStatusSkillStatus]);

    useEffect(() => {
        setSkills(listSkill);
    }, [listSkill]);

    useEffect(() => {
        setSkills(
            listSkill.filter((s) =>
                s.name.toLowerCase().includes(searchInput.toLowerCase())
            )
        );
    }, [debounce]);

    const handleFindSkill = (e: any) => {
        setSearchInput(e.target.value);
    };

    const handleGetAllSkillAsync = async () => {
        await dispatch(getAllSkillAsync());
    };

    const openUpdateModal = (data: ISkill) => {
        setIsOpenModal(!isOpenModal);
        setSkillUpdate(data);
    };

    const changeStatus = async (checked: boolean, skillId: number) => {
        await dispatch(updateStatusSkillAsync(skillId));
    };

    const columns: ColumnsType<ISkill> = [
        {
            title: "Mã",
            dataIndex: "skillId",
            key: "skillId",
        },
        {
            title: "Tên nhóm dịch vụ",
            dataIndex: "name",
            key: "name",
            render: (_: any, record: ISkill) => {
                return (
                    <div>
                        <div
                            style={{
                                textDecoration: "solid underline",
                                cursor: "pointer",
                                width: "fit-content",
                            }}
                            onClick={() => {
                                setIsOpenPanelSkill(true);
                                dispatch(
                                    getSkillByIdAsync(record.skillId || -1)
                                );
                            }}
                        >
                            {record.name}
                        </div>
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
            key: "updatedAt",
            dataIndex: "updatedAt",
        },
        {
            title: "Trạng thái",
            key: "isActive",
            dataIndex: "",
            render: (_: any, record: ISkill) => {
                return (
                    <Switch
                        onChange={(checked) => {
                            changeStatus(checked, record.skillId as number);
                        }}
                        checked={record.isActive}
                    />
                );
            },
        },
        {
            title: "",
            key: "action",
            dataIndex: "",
            render: (_: any, record: ISkill) => (
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
    const handleConfirmPanel = () => {
        setIsOpenPanelSkill(false);
    };

    return (
        <Spin spinning={loadingSkill || loadingUpdateStatusSkill}>
            <div className="skill">
                <h2>Danh sách loại dịch vụ</h2>
                <div className="header-table-skill">
                    <Button
                        type="primary"
                        onClick={() => setIsOpenModal(!isOpenModal)}
                    >
                        Thêm loại dịch vụ
                    </Button>
                    <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Nhập tên loại cần tìm kiếm"
                        onChange={handleFindSkill}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={skills.map((d: ISkill) => {
                        return {
                            ...d,
                            key: d.skillId,
                            createdAt: formatDate(d.createdAt, FORMAT_DATETIME),
                            updatedAt: formatDate(d.updatedAt, FORMAT_DATETIME),
                        };
                    })}
                    pagination={{ pageSize: 7 }}
                />
                {isOpenModal && (
                    <UpdateSkill
                        isOpen={isOpenModal}
                        close={() => {
                            setSkillUpdate(null);
                            setIsOpenModal(!isOpenModal);
                        }}
                        skill={skillUpdate}
                        isCreate={!skillUpdate}
                        handleGetAllSkillAsync={handleGetAllSkillAsync}
                    />
                )}
                {isOpenPanelSkill && (
                    <DetailSkill
                        isOpenPanel={isOpenPanelSkill}
                        handleConfirmPanel={handleConfirmPanel}
                        info={skill}
                    />
                )}
            </div>
        </Spin>
    );
};
