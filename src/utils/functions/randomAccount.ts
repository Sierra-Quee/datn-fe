import { Role } from "../../core/auth/roles";
import { ISkill, IUser } from "../model";

export const generateRandomPhoneNumber = () => {
    const randomPart = Math.floor(Math.random() * 1e9);
    const additionalPart = Math.floor(Math.random() * 9) + 1;
    const randomNumber = randomPart * 10 + additionalPart;
    return randomNumber;
};

export const lastNameArr = [
    "Nguyễn",
    "Đỗ",
    "Trần",
    "Phạm",
    "Hoàng",
    "Đặng",
    "Tạ",
    "Lê",
    "Vũ",
    "Hà",
    "Phùng",
    "Lưu",
];
export const subNameArr = [
    "Văn",
    "Thị",
    "Hoàng",
    "Hải",
    "Quang",
    "Thúy",
    "Trung",
    "Thanh",
    "Hoàng",
    "Đình",
    "Bảo",
    "Thu",
    "Anh",
    "Tú",
];
export const firstNameArr = [
    "Loan",
    "Hà",
    "Bảo",
    "Tú",
    "Minh",
    "Long",
    "Thúy",
    "Hoàng",
    "Hưng",
    "Hòa",
    "Hào",
    "Nam",
    "Hiếu",
    "Ngọc",
    "Phương",
    "Vy",
    "Bình",
    "Quang",
];

export const generateRandomLastName = () => {
    const ranLastName = Math.floor(Math.random() * lastNameArr.length);
    const ranSubName = Math.floor(Math.random() * subNameArr.length);

    return `${lastNameArr[ranLastName]} ${subNameArr[ranSubName]}`;
};

export const generateRandomFirstName = () => {
    const ranFirstName = Math.floor(Math.random() * firstNameArr.length);
    return firstNameArr[ranFirstName];
};

const generateRandomString = (length: number) => {
    const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
};

export const generateRandomEmail = () => {
    const username = generateRandomString(8);
    const domain = "gmail.com";

    const email = `${username}@${domain}`;
    return email;
};

export const generateRandomPassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?";

    const allChars =
        uppercaseChars + lowercaseChars + numberChars + specialChars;

    let password = "";
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(numberChars);
    password += getRandomChar(specialChars);
    for (let i = 4; i < 8; i++) {
        password += getRandomChar(allChars);
    }
    password = shuffleString(password);

    return password;
};

const getRandomChar = (characters: string) => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
};

const shuffleString = (string: string) => {
    const array = string.split("");
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
};

export const generateRandomAccountList = (
    role: Role,
    amount: number,
    skillList: ISkill[] = []
) => {
    const accList = [];
    for (let i = 0; i < amount; ++i) {
        const lastName = generateRandomLastName();
        const email = generateRandomEmail();
        const phone = generateRandomPhoneNumber();
        const password = generateRandomPassword();
        const firstName = generateRandomFirstName();
        const user = {
            lastName: lastName,
            firstName: firstName,
            phone: phone.toString(),
            password: password,
            dob: new Date().toLocaleDateString(),
            gender: Math.random() > 0.5 ? true : false,
            role: role,
            email: email,
        };
        accList.push(user);
    }

    return accList;
};
