import React from "react";
import { IService } from "../../../utils/model";
import { Flex, Space, Typography } from "antd";
const { Text, Title } = Typography;

type Props = {
    service?: IService;
};

const CheckoutItem = ({ service }: Props) => {
    console.log({ service });
    return (
        <Flex>
            <Text>{service?.serviceId}</Text>
            <Text>{service?.name}</Text>
            <Text>{service?.price}</Text>
        </Flex>
    );
};

export default CheckoutItem;
