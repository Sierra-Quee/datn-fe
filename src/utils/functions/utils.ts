import moment from "moment";
import { FORMAT_DATE } from "../constants";
import { ITypeService } from "../model";
// import { OrderStatus } from "../../core/reducers/order";

export const isNullOrEmpty = (value: any): boolean => {
    return value === null || value === "";
};

export const isNullOrEmptyOrUndefined = (value: any): boolean => {
    return value === null || value === "" || value === undefined;
};

export const deepClone = <T>(value: T): T => {
    return JSON.parse(JSON.stringify(value));
};

export const formatDate = (value: any, format?: string): string => {
    return moment(value).format(format || FORMAT_DATE);
};

export const compareObj = <T>(value1: T, value2: T) => {
    const _ = require("lodash");
    return _.isEqual(value1, value2);
};

export const checkNullObj = <T extends object>(value: T) => {
    return !value || Object.keys(value).length === 0;
};

export const convertServiceType = (type: ITypeService): string => {
    if (type === ITypeService.MainTain) {
        return "Bảo dưỡng";
    } else if (type === ITypeService.Repair) {
        return "Sửa chữa";
    } else {
        return "";
    }
};
// export const colorOrderStatus = (status: OrderStatus): string => {
//     if (status === OrderStatus.PENDING) {
//         return "ffaa56";
//     }
//     if (status === OrderStatus.REJECTED) {
//         return "ff0000";
//     }
//     if (status === OrderStatus.FINDING) {
//         return "b2b2b2";
//     }
//     if (status === OrderStatus.ACCEPTED) {
//         return "aad4ff";
//     }
//     if (status === OrderStatus.CHECKEDIN) {
//         return "ffffaa";
//     }
//     if (status === OrderStatus.COMPLETE) {
//         return "56ff56";
//     }
//     return "";
// };
// export const convertOrderStatus = (status: OrderStatus): string => {
//     if (status === OrderStatus.PENDING) {
//         return "Đang chờ xác nhận";
//     }
//     if (status === OrderStatus.REJECTED) {
//         return "Đơn hàng bị hủy";
//     }
//     if (status === OrderStatus.FINDING) {
//         return "Đang tìm kiếm thợ";
//     }
//     if (status === OrderStatus.ACCEPTED) {
//         return "Đơn hàng xác nhận";
//     }
//     if (status === OrderStatus.CHECKEDIN) {
//         return "Đơn hàng đang xử lí";
//     }
//     if (status === OrderStatus.COMPLETE) {
//         return "Đơn hàng hoàn thành";
//     }
//     return "";
// };
export const getMonthsBetweenDates = (startDate: string, endDate: string) => {
    let result = [];

    let currentDate = new Date(startDate);
    let endDateObj = new Date(endDate);

    while (currentDate <= endDateObj) {
        let month = currentDate.getMonth() + 1; // Months are zero-based
        let year = currentDate.getFullYear();

        result.push(`${month.toString().padStart(2, "0")}/${year}`);

        currentDate.setMonth(month);
    }

    return result;
};
