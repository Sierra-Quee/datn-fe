import "./Account.scss";

import { Spin, Tabs, TabsProps } from "antd";

import ErrorBoundary from "../../core/errors/error-boundary";
import { useAppSelector } from "../../redux/hook";
import Password from "./Password/Password";
import Profile from "./Profile/Profile";

const Account = () => {
    const { account } = useAppSelector((state) => state.authentication);
    const itemTabs: TabsProps["items"] = [
        {
            key: "1",
            label: "Thông tin tài khoản",
            children: <Profile account={account} />,
        },
        {
            key: "2",
            label: "Đổi mật khẩu",
            children: <Password />,
        },
    ];

    return (
        <div className="account">
            <ErrorBoundary>
                <Tabs defaultActiveKey="1" items={itemTabs} />
            </ErrorBoundary>
        </div>
    );
};

export default Account;
