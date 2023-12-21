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

export const generateRandomName = () => {
    const ranLastName = Math.floor(Math.random() * lastNameArr.length);
    const ranSubName = Math.floor(Math.random() * subNameArr.length);
    const ranFirstName = Math.floor(Math.random() * firstNameArr.length);

    return `${lastNameArr[ranLastName]} ${subNameArr[ranSubName]} ${firstNameArr[ranFirstName]}`;
};

export const generateRandomEmail = () => {};

export const generateRandomPassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?";

    const allChars =
        uppercaseChars + lowercaseChars + numberChars + specialChars;

    let password = "";

    // Bảo đảm mật khẩu có ít nhất một ký tự từ mỗi loại
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(numberChars);
    password += getRandomChar(specialChars);

    // Bổ sung các ký tự ngẫu nhiên cho đủ độ dài mật khẩu
    for (let i = 4; i < 8; i++) {
        password += getRandomChar(allChars);
    }

    // Trộn ngẫu nhiên các ký tự trong mật khẩu
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
