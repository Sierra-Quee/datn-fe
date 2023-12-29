import { Role } from "../../core/auth/roles";
import { IAddress, IDetailOrder, IOrder, ISkill, IUser } from "../model";

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
export const AddressList = [
    { latitude: 21.005228746070426, longitude: 105.8438483377508 },
    { latitude: 21.006050045988996, longitude: 105.84192787609614 },
    { latitude: 21.004978348854607, longitude: 105.83919202290097 },
    { latitude: 21.007101703918536, longitude: 105.83902036152402 },
    { latitude: 21.00222241391691, longitude: 105.84014351369794 },
    { latitude: 21.00139048742235, longitude: 105.84132522254254 },
    { latitude: 20.999889390928285, longitude: 105.84244881455871 },
    { latitude: 20.99920213689296, longitude: 105.83816754153156 },
    { latitude: 21.00332561363791, longitude: 105.846613853929 },
    { latitude: 20.99938299352483, longitude: 105.84295249373837 },
    { latitude: 21.007810669507418, longitude: 105.8362884307459 },
    { latitude: 21.00889574341571, longitude: 105.83512609417744 },
    { latitude: 21.012274061347266, longitude: 105.84943778570367 },
    { latitude: 20.999136407487867, longitude: 105.860093483959 },
    { latitude: 21.014229174647, longitude: 105.86086510348784 },
    { latitude: 21.022250430459128, longitude: 105.84435640071457 },
    { latitude: 21.02069029635885, longitude: 105.81910013691132 },
    { latitude: 21.007052873812402, longitude: 105.8317901714203 },
    { latitude: 21.015299417977012, longitude: 105.8101668358059 },
    { latitude: 21.021596813418633, longitude: 105.79869044305565 },
    { latitude: 21.029341521242337, longitude: 105.799698504581 },
    { latitude: 21.025867309555498, longitude: 105.8194720191169 },
    { latitude: 21.025722549211565, longitude: 105.78062287879324 },
    { latitude: 21.042200512678278, longitude: 105.77856262041027 },
    { latitude: 21.033265885264687, longitude: 105.7564662287152 },
    { latitude: 21.04166310681122, longitude: 105.7502043848147 },
    { latitude: 21.05073157433388, longitude: 105.75718598088766 },
    { latitude: 21.05288105602651, longitude: 105.768342139561 },
    { latitude: 20.996667664625605, longitude: 105.7292503044535 },
    { latitude: 21.05520912303907, longitude: 105.87442585491287 },
    { latitude: 21.063926321635403, longitude: 105.85950795199776 },
    { latitude: 21.05911240943013, longitude: 105.79175000043935 },
    { latitude: 21.074594436735573, longitude: 105.76553910559782 },
    { latitude: 21.045710698558988, longitude: 105.72636218298895 },
    { latitude: 21.055989788507446, longitude: 105.86829139016274 },
    { latitude: 21.0817373450383, longitude: 105.76168898674709 },
];

export const getRandomAddress = (userIdList: string[]) => {
    console.log({ getRanADdd: userIdList });
    if (Array.isArray(userIdList) && userIdList.length > 0) {
        const addressList: IAddress[] = userIdList.map((id) => {
            const randomIdx = Math.floor(Math.random() * AddressList.length);
            return {
                userId: id,
                latitude: AddressList[randomIdx].latitude,
                longitude: AddressList[randomIdx].longitude,
                address: "",
                isMainAddress: true,
            };
        });

        return addressList;
    }

    return [];
};

export const generateRandomOrders = (
    userIdList: string[],
    addressIdList: number[],
    serviceIdList: number[]
) => {
    if (!Array.isArray(userIdList) || userIdList.length === 0) return [];
    if (!Array.isArray(addressIdList) || addressIdList.length === 0) return [];
    if (!Array.isArray(serviceIdList) || serviceIdList.length === 0) return [];

    const orders: IOrder[] = userIdList.map((userId, index) => {
        const randomServiceIdIndex = Math.floor(
            Math.random() * serviceIdList.length
        );
        const serviceId = serviceIdList[randomServiceIdIndex];
        const orderDetail: IDetailOrder = {
            serviceId: serviceId,
        };

        return {
            addressId: addressIdList[index],
            userId,
            expectedDate: new Date().toISOString(),
            orderDetail: [orderDetail],
        };
    });

    return orders;
};
