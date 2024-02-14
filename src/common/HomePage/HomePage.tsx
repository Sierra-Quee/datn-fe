import "./HomePage.scss";

import {
    Card,
    Carousel,
    Col,
    Empty,
    Flex,
    Rate,
    Row,
    Space,
    Spin,
    Typography,
} from "antd";
import { useEffect, useState } from "react";

import Images from "../../assets/Images";
import { getAllServiceAsync } from "../../core/reducers/service";
import { getAllSkillAsync } from "../../core/reducers/skill";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IService, ISkill } from "../../utils/model";
import { FaHome, FaLaptop, FaSolarPanel, FaWifi } from "react-icons/fa";
const { Title, Text, Paragraph } = Typography;

const logoImgs: string[] = [
    "https://vccservices.vn/uploads/images/banner/2022/01/06/samsung2.jpg",
    "https://vccservices.vn/uploads/images/banner/2022/01/06/sunhouse.jpg",
    "https://vccservices.vn/uploads/images/banner/2022/01/06/casper.png",
    "https://vccservices.vn/uploads/images/banner/2022/01/06/karofi.png",
];
const HomePage = () => {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [services, setServices] = useState<IService[]>([]);

    const dispatch = useAppDispatch();

    const { listSkill } = useAppSelector((state) => state.skill);
    const { listService } = useAppSelector((state) => state.service);

    useEffect(() => {
        handleGetAllSkillAsync();
        handleGetAllServiceAsync();
    }, [dispatch]);

    useEffect(() => {
        setSkills([...listSkill.filter((skill) => skill.isActive)]);
        setServices([...listService.filter((service) => service.isActive)]);
    }, [listSkill, listService]);

    const handleGetAllSkillAsync = async () => {
        await dispatch(getAllSkillAsync());
    };

    const handleGetAllServiceAsync = async () => {
        await dispatch(getAllServiceAsync());
    };

    return (
        <div className="home-page">
            <Carousel autoplay className="carousel">
                <div style={{ width: "100%", height: "200px" }}>
                    <img
                        src={Images.banner1}
                        alt=""
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100vh",
                            filter: "brightness(0.95)",
                        }}
                    />
                </div>
                <div style={{ width: "100%", height: "200px" }}>
                    <img
                        src={Images.banner2}
                        alt=""
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100vh",
                            filter: "brightness(0.95)",
                        }}
                    />
                </div>
                <div style={{ width: "100%", height: "200px" }}>
                    <img
                        src={Images.banner3}
                        alt=""
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100vh",
                            filter: "brightness(0.95)",
                        }}
                    />
                </div>
            </Carousel>
            {/* <div className="home-page-content">
                {skills.map((skill) => (
                    <div className="home-page-content-item" key={skill.skillId}>
                        <h2 className="home-page-content-item-title">
                            {skill.name}
                        </h2>
                        {services.filter((s) => s.skillId === skill.skillId)
                            .length ? (
                            <div className="home-page-content-item-child">
                                {services
                                    .filter((s) => s.skillId === skill.skillId)
                                    .sort((a, b) => b.rate - a.rate)
                                    .slice(0, 4)
                                    .map((s) => (
                                        <Card
                                            hoverable
                                            style={{ width: 250 }}
                                            key={s.serviceId}
                                            cover={
                                                <img
                                                    alt="card"
                                                    style={{
                                                        height: 250,
                                                        backgroundColor: "#ccc",
                                                    }}
                                                    src={
                                                        s.image ||
                                                        Images.no_image
                                                    }
                                                />
                                            }
                                        >
                                            <div className="card-title">
                                                {s?.name}
                                            </div>
                                            <div className="card-value">
                                                <div
                                                    style={{
                                                        marginBottom: 5,
                                                    }}
                                                >
                                                    Giá:{" "}
                                                    <span
                                                        style={{
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {s.price} đ
                                                    </span>
                                                </div>
                                                {s.rate ? (
                                                    <Rate
                                                        value={s.rate}
                                                        disabled
                                                    />
                                                ) : (
                                                    <div>Không có đánh giá</div>
                                                )}
                                            </div>
                                        </Card>
                                    ))}
                            </div>
                        ) : (
                            <Empty />
                        )}
                    </div>
                ))}
            </div> */}
            <div style={{ overflow: "hidden", width: "100%" }}>
                <Flex
                    vertical
                    align="center"
                    style={{
                        background: "white",
                    }}
                    gap={20}
                >
                    <Title level={3} style={{ fontWeight: "bold" }}>
                        GIỚI THIỆU
                    </Title>
                    <Flex gap={50}>
                        <Flex
                            vertical
                            align="center"
                            style={{ width: "200px", textAlign: "center" }}
                        >
                            <div
                                style={{
                                    width: "90px",
                                    height: "90px",
                                    borderStyle: "solid",
                                    borderColor: "#363062",
                                    borderWidth: "3px 1px 0 1px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                }}
                            >
                                <div
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        borderStyle: "solid",
                                        borderColor: "#363062",
                                        borderWidth: "0 3px 5px 3px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "50%",
                                    }}
                                >
                                    <FaSolarPanel
                                        style={{
                                            fontSize: "24px",
                                            color: "red",
                                            background: "white",
                                            padding: "15px",
                                            boxSizing: "content-box",
                                            borderRadius: "50%",
                                            boxShadow:
                                                "rgba(50, 50, 93, 0.25) 0px 20px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                                        }}
                                    />
                                </div>
                            </div>
                            <Text>Các dịch vụ năng lượng</Text>
                        </Flex>
                        <Flex
                            vertical
                            align="center"
                            style={{ width: "200px", textAlign: "center" }}
                        >
                            <div
                                style={{
                                    width: "90px",
                                    height: "90px",
                                    borderStyle: "solid",
                                    borderColor: "#363062",
                                    borderWidth: "0 1px 3px 1px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                }}
                            >
                                <div
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        borderStyle: "solid",
                                        borderColor: "#363062",
                                        borderWidth: "5px 3px 0 3px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "50%",
                                    }}
                                >
                                    <FaLaptop
                                        style={{
                                            fontSize: "24px",
                                            color: "red",
                                            background: "white",
                                            padding: "15px",
                                            boxSizing: "content-box",
                                            borderRadius: "50%",
                                            boxShadow:
                                                "rgba(50, 50, 93, 0.25) 0px 20px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                                        }}
                                    />
                                </div>
                            </div>
                            <Text>Các dịch vụ công nghệ thông tin</Text>
                        </Flex>
                        <Flex
                            vertical
                            align="center"
                            style={{ width: "200px", textAlign: "center" }}
                        >
                            <div
                                style={{
                                    width: "90px",
                                    height: "90px",
                                    borderStyle: "solid",
                                    borderColor: "#363062",
                                    borderWidth: "3px 1px 0 1px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                }}
                            >
                                <div
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        borderStyle: "solid",
                                        borderColor: "#363062",
                                        borderWidth: "0 3px 5px 3px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "50%",
                                    }}
                                >
                                    <FaHome
                                        style={{
                                            fontSize: "24px",
                                            color: "red",
                                            background: "white",
                                            padding: "15px",
                                            boxSizing: "content-box",
                                            borderRadius: "50%",
                                            boxShadow:
                                                "rgba(50, 50, 93, 0.25) 0px 20px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                                        }}
                                    />
                                </div>
                            </div>
                            <Text>Sửa chữa/Bảo dưỡng hộ gia đình</Text>
                        </Flex>
                        <Flex
                            vertical
                            align="center"
                            style={{ width: "200px", textAlign: "center" }}
                        >
                            <div
                                style={{
                                    width: "90px",
                                    height: "90px",
                                    borderStyle: "solid",
                                    borderColor: "#363062",
                                    borderWidth: "0 1px 3px 1px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50%",
                                }}
                            >
                                <div
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        borderStyle: "solid",
                                        borderColor: "#363062",
                                        borderWidth: "5px 3px 0 3px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "50%",
                                    }}
                                >
                                    <FaWifi
                                        style={{
                                            fontSize: "24px",
                                            color: "red",
                                            background: "white",
                                            padding: "15px",
                                            boxSizing: "content-box",
                                            borderRadius: "50%",
                                            boxShadow:
                                                "rgba(50, 50, 93, 0.25) 0px 20px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                                        }}
                                    />
                                </div>
                            </div>
                            <Text>Các dịch vụ viễn thông</Text>
                        </Flex>
                    </Flex>
                    <Flex vertical align="center">
                        <Flex style={{ width: "80%", gap: "20px" }}>
                            <Space
                                direction="vertical"
                                style={{ width: "50%" }}
                            >
                                <Title
                                    level={2}
                                    style={{ textAlign: "center" }}
                                >
                                    15 năm dẫn đầu cung cấp dịch vụ sửa chữa
                                </Title>
                                <Paragraph>
                                    Hệ thống HandyConnect ra đời năm 2009 với
                                    mục tiêu kết nối thợ sửa chữa với khách hàng
                                    một các dễ dàng và nhanh chóng. Sau 15 năm
                                    đi vào hoạt động, HandyConnect đã trở thành
                                    nền tảng hàng đầu lĩnh vực, thu hút hàng
                                    nghìn thợ sửa chữa và khách hàng sử dụng mỗi
                                    tháng.
                                </Paragraph>
                            </Space>
                            <div style={{ width: "50%" }}>
                                <img
                                    src={Images.years}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                            </div>
                        </Flex>
                        <Flex style={{ width: "80%", gap: "20px" }}>
                            <div style={{ width: "50%" }}>
                                <img
                                    src="https://img.freepik.com/free-photo/waist-up-shot-repairman-showing-digital-questionnaire-senior-client_1098-17858.jpg?w=996&t=st=1707884994~exp=1707885594~hmac=33406e9f845aa5698221f9302928a6e53691dc5924a31f240be5234302674beb"
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                            </div>
                            <Space
                                direction="vertical"
                                style={{ width: "50%" }}
                            >
                                <Title
                                    level={2}
                                    style={{ textAlign: "center" }}
                                >
                                    Đội ngũ nhân viên sửa chữa chuyên nghiệp
                                </Title>
                                <Paragraph>
                                    Mỗi nhân viên sửa chữa khi lựa chọn tham gia
                                    nền tảng của chúng tôi sẽ được đội ngũ
                                    chuyên gia đánh giá kỹ lưỡng, trải qua các
                                    bài đánh giá năng lực để chọn lọc ra những
                                    thành viên có năng lực tốt.
                                </Paragraph>
                            </Space>
                        </Flex>
                        <Flex style={{ width: "80%", gap: "20px" }}>
                            <Space
                                direction="vertical"
                                style={{ width: "50%" }}
                            >
                                <Title
                                    level={2}
                                    style={{ textAlign: "center" }}
                                >
                                    Đa dạnh lĩnh vực dịch vụ
                                </Title>
                                <Paragraph>
                                    HandyConnect cung cấp đã dạnh lĩnh vực dịch
                                    vụ sửa chữa như điện tử, điện lạnh, điện
                                    nước, bảo dượng hệ thống, lắp đặt,...
                                </Paragraph>
                            </Space>
                            <div style={{ width: "50%" }}>
                                <img
                                    src={Images.services}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                            </div>
                        </Flex>
                        <Flex style={{ width: "80%", gap: "20px" }}>
                            <div style={{ width: "50%" }}>
                                <img
                                    src="https://img.freepik.com/free-photo/cropped-view-woman-filling-application-form_1262-2110.jpg?w=996&t=st=1707895322~exp=1707895922~hmac=f6f69f7cef79f8c52faf5be71f37462c0e015e94bddefe8e285c31524c1956d5"
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                            </div>
                            <Space
                                direction="vertical"
                                style={{ width: "50%" }}
                            >
                                <Title
                                    level={2}
                                    style={{ textAlign: "center" }}
                                >
                                    Dễ dàng đăng ký
                                </Title>
                                <Paragraph>
                                    Chỉ với vài click đơn giản, khách hàng có
                                    thể nhanh chóng đăng ký tài khoản và trải
                                    nghiệm các dịch vụ sửa chữa, bảo dưỡng của
                                    nền tảng HandyConnect thông qua website
                                    chính thức. Đối với thợ sửa chữa, hãy gửi cv
                                    qua email của chúng tôi, đội ngũ nhân viên
                                    sẽ nhanh chóng liên lạc để hướng dẫn bạn các
                                    bước tiếp theo.
                                </Paragraph>
                            </Space>
                        </Flex>
                        <Flex style={{ width: "80%", gap: "20px" }}>
                            <Space
                                direction="vertical"
                                style={{ width: "50%" }}
                            >
                                <Title
                                    level={2}
                                    style={{ textAlign: "center" }}
                                >
                                    Cung cấp dịch vụ sửa chữa 24/7
                                </Title>
                                <Paragraph>
                                    HandyConnect cung cấp dịch vụ sửa chữa 24/7,
                                    nhanh chóng tìm được thợ sửa chữa phù hợp
                                    với như cầu của bạn. Do vậy đừng ngần ngại
                                    chỉ với vài cú click chuột, mọi rắc rối của
                                    bạn sẽ được giải quyết dù đó là ngày nghỉ
                                    lễ, ngày mưa gió.
                                </Paragraph>
                            </Space>
                            <div style={{ width: "50%" }}>
                                <img
                                    src={Images.allday}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                            </div>
                        </Flex>
                    </Flex>
                </Flex>
            </div>
            <Flex
                vertical
                style={{
                    width: "100%",
                    background: "white",
                    padding: "50px 0",
                }}
                align="center"
            >
                <Title level={3} style={{ fontWeight: "bold" }}>
                    ĐỐI TÁC CỦA CHÚNG TÔI
                </Title>
                {/* <div>
                    <img src="https://vccservices.vn/uploads/images/banner/2022/01/06/karofi.png" />
                </div> */}
                <div
                    style={{
                        width: "80%",
                        margin: "auto",
                    }}
                >
                    <Row gutter={[16, 24]}>
                        {logoImgs.map((val, idx) => (
                            <Col className="gutter-row" span={6} key={idx}>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "80px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                    }}
                                >
                                    <img
                                        src={val}
                                        style={{
                                            width: "100%",
                                            objectFit: "contain",
                                            height: "100%",
                                        }}
                                        alt=""
                                    />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Flex>
        </div>
    );
};

export default HomePage;
