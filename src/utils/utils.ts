export const isNullOrEmpty = (value: any): boolean => {
    return value === null || value === "";
};

export const deepClone = <T>(value: T): T => {
    return JSON.parse(JSON.stringify(value));
};
