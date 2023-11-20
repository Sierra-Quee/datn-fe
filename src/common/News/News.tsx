import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Images from "../../assets/Images";
import "./News.scss";

interface INew {
    idNew: string;
    link: string;
    img: string;
    title: string;
    description: string;
}
interface INewProps {
    item: INew[];
}
export const item: INew[] = [
    {
        idNew: "1",
        link: "https://aioservice.com.vn/5-dau-hieu-canh-bao-may-loc-nuoc-nha-ban-can-thay-loi",
        img: Images.five_water_machine,
        title: "5 dấu hiệu cảnh báo máy lọc nước nhà bạn cần thay lõi.",
        description:
            "Làm thế nào để nhận biết lõi lọc nước nhà bạn đã đến thời gian cần phải thay lõi, cùng Viettel construction tìm hiểu",
    },
    {
        idNew: "1",
        link: "https://aioservice.com.vn/5-dau-hieu-canh-bao-may-loc-nuoc-nha-ban-can-thay-loi",
        img: Images.reason_water_machine,
        title: "Mẹo xử lí máy lọc nước có mùi hôi hiệu quả tại nhà.",
        description:
            "Máy lọc nước là một thiết bị quan trọng trong cuộc sống hàng ngày của chúng ta, giúp loại bỏ các tạp chất và vi khuẩn từ .",
    },
    {
        idNew: "1",
        link: "https://aioservice.com.vn/5-dau-hieu-canh-bao-may-loc-nuoc-nha-ban-can-thay-loi",
        img: Images.fix_water_machine,
        title: "5 nguyên nhân máy lọc nước bị rỉ nước và hướng dẫn cách khắc phục",
        description: "",
    },
    {
        idNew: "1",
        link: "https://aioservice.com.vn/5-dau-hieu-canh-bao-may-loc-nuoc-nha-ban-can-thay-loi",
        img: Images.heater,
        title: "Mách bạn cách sử dụng bình nóng lạnh tiết kiệm điện trong mùa đông này",
        description:
            "Bình nóng lạnh là một trong những thiết bị điện tử không thể thiếu trong mỗi gia đình, đặc biệt trong mùa đông lạnh giá.",
    },
    {
        idNew: "1",
        link: "https://aioservice.com.vn/5-dau-hieu-canh-bao-may-loc-nuoc-nha-ban-can-thay-loi",
        img: Images.five_water_machine,
        title: "5 dấu hiệu cảnh báo máy lọc nước nhà bạn cần thay lõi.",
        description:
            "Làm thế nào để nhận biết lõi lọc nước nhà bạn đã đến thời gian cần phải thay lõi, cùng Viettel construction tìm hiểu",
    },
    {
        idNew: "1",
        link: "https://aioservice.com.vn/5-dau-hieu-canh-bao-may-loc-nuoc-nha-ban-can-thay-loi",
        img: Images.five_water_machine,
        title: "5 dấu hiệu cảnh báo máy lọc nước nhà bạn cần thay lõi.",
        description:
            "Làm thế nào để nhận biết lõi lọc nước nhà bạn đã đến thời gian cần phải thay lõi, cùng Viettel construction tìm hiểu",
    },
    {
        idNew: "1",
        link: "https://aioservice.com.vn/5-dau-hieu-canh-bao-may-loc-nuoc-nha-ban-can-thay-loi",
        img: Images.five_water_machine,
        title: "5 dấu hiệu cảnh báo máy lọc nước nhà bạn cần thay lõi.",
        description:
            "Làm thế nào để nhận biết lõi lọc nước nhà bạn đã đến thời gian cần phải thay lõi, cùng Viettel construction tìm hiểu",
    },
];
export const News = () => {
    return (
        <div className="news_page">
            {item.map((ite) => {
                return (
                    <Link key={ite.idNew} to={`${ite.link}`}>
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
                                    src={ite.img || Images.no_image}
                                />
                            }
                        >
                            <div style={{ textAlign: "center" }}>
                                {ite.title}
                            </div>
                            <div>{ite.description}</div>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
};
