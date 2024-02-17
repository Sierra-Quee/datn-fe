import "./Skill.scss";

import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Switch } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { read, utils, writeFile } from "xlsx";

import {
    clearListSkill,
    clearUpdateStatusSkill,
    getAllSkillAsync,
    updateStatusSkillAsync,
} from "../../core/reducers/skill";
import useDebounce from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { FORMAT_DATETIME, XLS_TYPE, XLSX_TYPE } from "../../utils/constants";
import { formatDate } from "../../utils/functions/utils";
import { ISkill } from "../../utils/model";
import AddListSkills from "./AddListSkill/AddListSkill";
import UpdateSkill from "./UpdateSkill/UpdateSkill";

const Skill = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [skillUpdate, setSkillUpdate] = useState<ISkill | null | undefined>();
    const [searchInput, setSearchInput] = useState<string>("");
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [listSkillExport, setListSkillExport] = useState<any[]>([]);
    const [listSkillAdd, setListSkillAdd] = useState<any[] | null>(null);
    const dispatch = useAppDispatch();

    const { listSkill } = useAppSelector((state) => state.skill);

    const { updateStatusSkillStatus } = useAppSelector(
        (state) => state.skill.updateStatusSkill
    );

    const debounce = useDebounce(searchInput);

    useEffect(() => {
        handleGetAllSkillAsync();

        return () => {
            dispatch(clearListSkill());
        };
    }, []);

    useEffect(() => {
        if (updateStatusSkillStatus === "success") {
            toast.success("Cập nhật trang thái thành công");
            dispatch(clearUpdateStatusSkill());
            handleGetAllSkillAsync();
        }
    }, [updateStatusSkillStatus, dispatch]);

    useEffect(() => {
        setSkills(listSkill);
        setListSkillExport(
            listSkill.map((skill) => {
                return {
                    id: skill.skillId,
                    name: skill.name,
                    image: skill.image,
                    createdDate: formatDate(skill.createdAt, FORMAT_DATETIME),
                    updatedDate: formatDate(skill.updatedAt, FORMAT_DATETIME),
                    isActive: skill.isActive,
                };
            })
        );
    }, [listSkill]);

    useEffect(() => {
        if (debounce !== undefined) {
            setSkills(
                listSkill.filter((s) =>
                    s.name
                        .toLowerCase()
                        .includes((debounce as string).toLowerCase())
                )
            );

            setListSkillExport(
                listSkill
                    .filter((s) =>
                        s.name
                            .toLowerCase()
                            .includes((debounce as string).toLowerCase())
                    )
                    .map((skill) => {
                        return {
                            id: skill.skillId,
                            name: skill.name,
                            image: skill.image,
                            createdDate: formatDate(
                                skill.createdAt,
                                FORMAT_DATETIME
                            ),
                            updatedDate: formatDate(
                                skill.updatedAt,
                                FORMAT_DATETIME
                            ),
                            isActive: skill.isActive,
                        };
                    })
            );
        }
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
    const handleExport = () => {
        const headings = [
            [
                "Mã dịch vụ",
                "Tên dịch vụ",
                "Hình ảnh",
                "Thời gian tạo",
                "Thời gian cập nhật",
                "Trạng thái",
            ],
        ];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        ws["!cols"] = [{ wch: 15 }, { wch: 18 }, { wch: 18 }, { wch: 15 }]; // set column A width to 10 characters
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, listSkillExport, {
            origin: "A2",
            skipHeader: true,
        });
        utils.book_append_sheet(wb, ws, "Report");
        writeFile(wb, "Danh sách loại dịch vụ.xlsx");
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
                    const listAddImport = rows.map((item: any) => {
                        return {
                            name: item["Tên loại dịch vụ"],
                            createdAt: item["Thời gian tạo"],
                            updatedAt: item["Thời gian cập nhật"],
                            isActive: item["Trạng thái"] === "Đang hoạt động",
                            image: "",
                        };
                    });
                    setListSkillAdd(listAddImport);
                    setFileName(file.name);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div className="skill">
            <h2>Danh sách kỹ năng</h2>
            <div className="header-table-skill">
                <div className="header-table-skill-left">
                    <Button
                        type="primary"
                        onClick={() => setIsOpenModal(!isOpenModal)}
                        style={{
                            background: "#435585",
                        }}
                    >
                        Thêm kỹ năng
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
                </div>
                <div className="header-table-skill-right">
                    <Button
                        type="primary"
                        onClick={handleExport}
                        icon={<DownloadOutlined />}
                        disabled={
                            !listSkillExport || listSkillExport.length === 0
                        }
                        style={{ background: "#435585" }}
                    >
                        Xuất file excel
                    </Button>
                    <Input
                        addonBefore={
                            <SearchOutlined style={{ fontSize: "20px" }} />
                        }
                        placeholder="Nhập tên loại cần tìm kiếm"
                        onChange={handleFindSkill}
                    />
                </div>
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
            {listSkillAdd && listSkillAdd.length && (
                <AddListSkills
                    handleGetAllSkill={handleGetAllSkillAsync}
                    listAdd={listSkillAdd}
                    close={() => {
                        setListSkillAdd(null);
                    }}
                    fileName={fileName}
                />
            )}
        </div>
    );
};

export default Skill;
