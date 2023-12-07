import "./SystemService.scss";

import { SearchOutlined } from "@ant-design/icons";
import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Images from "../../assets/Images";
import { clearListSkill, getAllSkillAsync } from "../../core/reducers/skill";
import useDebounce from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ISkill } from "../../utils/model";

const SystemService = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [skills, setSkills] = useState<ISkill[]>([]);

    const dispatch = useAppDispatch();
    const { listSkill } = useAppSelector((state) => state.skill);

    const debounce = useDebounce(searchInput);

    useEffect(() => {
        handleGetAllSkillAsync();

        return () => {
            dispatch(clearListSkill());
        };
    }, []);

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

    const handleGetAllSkillAsync = async () => {
        await dispatch(getAllSkillAsync());
    };

    const handleFindSkill = (e: any) => {
        setSearchInput(e.target.value);
    };

    return (
        <div className="system-service">
            <div className="wrap-input-find">
                <Input
                    addonBefore={
                        <SearchOutlined style={{ fontSize: "20px" }} />
                    }
                    placeholder="Nhập loại dịch vụ cần tìm kiếm"
                    onChange={handleFindSkill}
                />
            </div>
            <div className="system-service-content">
                {(skills && skills.length === 0) || !skills ? (
                    <div>Không có dữ liệu nào</div>
                ) : (
                    skills.map((skill) => {
                        return (
                            <Link key={skill.skillId} to={`${skill.skillId}`}>
                                <Card
                                    hoverable
                                    style={{ width: 250 }}
                                    cover={
                                        <img
                                            alt="card"
                                            style={{
                                                height: 250,
                                                backgroundColor: "#ccc",
                                            }}
                                            src={skill.image || Images.no_image}
                                        />
                                    }
                                >
                                    <div style={{ textAlign: "center" }}>
                                        {skill.name}
                                    </div>
                                </Card>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
};
export default SystemService;
