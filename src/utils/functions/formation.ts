import { OrderStatus } from "../constants";

export const formatOrderStatusName = (status?: number) => {
    if (status === undefined) return "";
    let statusName = "";
    switch (status) {
        case OrderStatus.PENDING:
            statusName = "Đang xử lý";
            break;
        case OrderStatus.ACCEPTED:
            statusName = "Đã giao thợ sửa chữa";
            break;
        case OrderStatus.CHECKEDIN:
            statusName = "Đang tiến hành sửa";
            break;
        case OrderStatus.COMPLETE:
            statusName = "Đã hoàn thành";
            break;
        case OrderStatus.REJECTED:
            statusName = "Đã hủy";
            break;
        default:
            break;
    }

    return statusName.toUpperCase();
};
