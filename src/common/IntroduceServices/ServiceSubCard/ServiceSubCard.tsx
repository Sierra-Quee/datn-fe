import { useNavigate } from "react-router-dom";
import { IService } from "../../../utils/model";
import { Flex, Image, Rate, Space, Typography } from "antd";
const { Title } = Typography;
type Props = {
    service: IService;
};

const ServiceSubCard = ({ service }: Props) => {
    const navigate = useNavigate();
    return (
        <Flex
            style={{
                background: "white",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
            }}
            gap={20}
            onClick={() =>
                navigate(
                    `/introduce-services/${service.skillId}/${service.serviceId}`
                )
            }
        >
            <Image
                src={service.image}
                style={{ width: "100px", height: "100px" }}
            />
            <Space direction="vertical">
                <Title level={4} style={{ margin: 0 }}>
                    {service.name}
                </Title>
                <Rate value={service.rate} disabled />
            </Space>
        </Flex>
    );
};

export default ServiceSubCard;
