import { Link } from "react-router-dom";
import { ISkill } from "../../utils/model";
import { ServiceComponent } from "../Services/Service";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect, useState } from "react";
import skill, { getAllSkillAsync } from "../../core/reducers/skill";
import Table, { ColumnsType } from "antd/es/table";
import { Button, Input, Spin } from "antd";
import "./Skill.scss";
import { SearchOutlined } from "@ant-design/icons";
import UpdateSkill from "./UpdateSkill/UpdateSkill";
import DeleteSkill from "./DeleteSkill/DeleteSkill";
import { formatDate } from "../../utils/functions/utils";
import { FORMAT_DATETIME } from "../../utils/constants";
import useDebounce from "../../hooks/useDebounce";

export const Skill = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isDeleteSkill, setIsDeleteSkill] = useState<boolean>(false);
    const [skillUpdate, setSkillUpdate] = useState<ISkill | null | undefined>();
    const [skillDelete, setSkillDelete] = useState<ISkill | null>(null);
    const [searchInput, setSearchInput] = useState<string>("");
    const [skills, setSkills] = useState<ISkill[]>([]);

    const dispatch = useAppDispatch();

    const { listSkill, loadingSkill } = useAppSelector((state) => state.skill);

    const debounce = useDebounce(searchInput);

    useEffect(() => {
        handleGetAllSkillAsync();
    }, []);

    useEffect(() => {
        setSkills(listSkill);
    }, [listSkill]);

    useEffect(() => {
        setSkills(listSkill.filter((s) => s.name.includes(searchInput)));
    }, [debounce]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleFindSkill = (e: any) => {
        setSearchInput(e.target.value);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleGetAllSkillAsync = async () => {
        await dispatch(getAllSkillAsync());
    };

    const openUpdateModal = (data: ISkill) => {
        setIsOpenModal(!isOpenModal);
        setSkillUpdate(data);
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
            render: (text: string) => <a>{text}</a>,
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
            title: "",
            key: "action",
            dataIndex: "",
            render: (_: any, record: ISkill) => (
                <div>
                    <a
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                            openUpdateModal(record);
                            setSkillUpdate(record);
                        }}
                    >
                        Cập nhật
                    </a>
                    <a>Xóa</a>
                </div>
            ),
        },
    ];

    return (
        <Spin spinning={loadingSkill}>
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
                    dataSource={skills.map((d) => {
                        return {
                            ...d,
                            key: d.skillId,
                            createdAt: formatDate(d.createdAt, FORMAT_DATETIME),
                            updatedAt: formatDate(d.updatedAt, FORMAT_DATETIME),
                        };
                    })}
                    rowSelection={rowSelection}
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
                {isDeleteSkill && (
                    <DeleteSkill
                        isOpen={isDeleteSkill}
                        skill={skillDelete}
                        close={() => {
                            setSkillDelete(null);
                            setIsDeleteSkill(!isDeleteSkill);
                        }}
                    />
                )}
            </div>
        </Spin>
    );
};
