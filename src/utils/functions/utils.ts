import moment from "moment";
import { FORMAT_DATE } from "../constants";

export const isNullOrEmpty = (value: any): boolean => {
    return value === null || value === "";
};

export const isNullOrEmptyOrUndefined = (value: any): boolean => {
    return value === null || value === "" || value === undefined;
};

export const deepClone = <T>(value: T): T => {
    return JSON.parse(JSON.stringify(value));
};

export const formatDate = (value: any): string => {
    return moment(value).format(FORMAT_DATE);
};

export const compareObj = <T>(value1: T, value2: T) => {
    const _ = require("lodash");
    return _.isEqual(value1, value2);
};

export const checkNullObj = <T extends object>(value: T) => {
    return !value || Object.keys(value).length === 0;
};
