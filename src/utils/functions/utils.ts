import moment from "moment";
import { FORMAT_DATE } from "../constants";
import { ITypeService } from "../model";

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
