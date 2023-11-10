import "./Introduce.scss";

import { Image, Spin } from "antd";
import { useEffect, useState } from "react";

import Images from "../../assets/Images";
import { getAllSkillAsync } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ISkill } from "../../utils/model";

const Introduce = () => {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const dispatch = useAppDispatch();

    const { listSkill, loadingSkill } = useAppSelector((state) => state.skill);

    useEffect(() => {
        handleGetAllSkillAsync();
    }, []);

    useEffect(() => {
        setSkills([...listSkill.filter((s) => s.isActive)]);
    }, [listSkill]);

    const handleGetAllSkillAsync = async () => {
        await dispatch(getAllSkillAsync());
    };

    return (
        <Spin spinning={loadingSkill}>
            <div className="introduce">
                <div className="introduce-image-wrap">
                    <div className="introduce-image-item">
                        <Image
                            src={Images.cold_machine}
                            width={250}
                            height={150}
                            preview={false}
                        />
                    </div>
                    <div className="introduce-image-item">
                        <Image
                            src={Images.fridge}
                            width={250}
                            height={150}
                            preview={false}
                        />
                    </div>
                    <div className="introduce-image-item">
                        <Image
                            src={Images.sun_battery}
                            width={250}
                            height={150}
                            preview={false}
                        />
                    </div>
                    <div className="introduce-image-item">
                        <Image
                            src={Images.washing_machine}
                            width={250}
                            height={150}
                            preview={false}
                        />
                    </div>
                </div>
                <h2 className="introduce-title">giới thiệu về Ismart</h2>
                <div className="introduce-content">
                    <p className="introduce-content-title">
                        <b>Ismart</b> là đơn vị kinh doanh với các lĩnh vực đa
                        đạng như công nghệ thông tin, điện năng lượng tái tạo và
                        dịch vụ chăm sóc điện gia đình, doanh nghiệp.{" "}
                    </p>

                    {!!listSkill.length && (
                        <div className="introduce-content-title">
                            Phát huy tiềm năng và nguồn lực sẵn có, hiện
                            <b> Ismart</b> tự hào là đơn vị vận hành, triển khai{" "}
                            {skills.length} dịch vụ chính:
                            <ul>
                                {skills.map((skill) => (
                                    <li key={skill.skillId}>
                                        <b>{skill.name}</b>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <p className="introduce-content-title">
                        Luôn tôn trọng khách hàng, <b>Ismart</b> cũng nhận thức
                        được mỗi khách hàng làm một cá thể cần được tôn trọng,
                        quan tâm, thấu hiểu và phục vụ một cách riêng biệt.
                        Chính vì vậy, nâng cao chất lượng dịch vụ, liên tục đổi
                        mới để thích ứng với thị trường, đáp ứng nhu cầu ngày
                        càng cao của xã hội là điều
                        <b> Ismart</b> luôn chú trọng.
                    </p>
                    <p className="introduce-content-title">
                        Ngoài ra, <b>Ismart</b> còn luôn quan tâm đến công tác
                        xã hội, hoạt động nhân đạo, phát huy các giá trị:
                    </p>
                    <ol className="introduce-content-title">
                        <li>Thực tiễn là tiêu chuẩn để kiểm nghiệm chân lý</li>
                        <li>Trưởng thành qua những thách thức và thất bại</li>
                        <li>Thích ứng nhanh là sức mạnh cạnh tranh</li>
                        <li>Sáng tạo là sức sống</li>
                        <li> Tư duy hệ thống</li>
                        <li>Kết hợp Đông Tây</li>
                        <li>
                            <b>Ismart</b> là ngôi nhà chung
                        </li>
                    </ol>
                </div>
            </div>
        </Spin>
    );
};

export default Introduce;
