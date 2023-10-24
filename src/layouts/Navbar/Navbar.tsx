import { Avatar, Dropdown, MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../components/redux/hook";
import "./Navbar.scss";
import { clearCookie } from "../../utils/cookies";

const Navbar = () => {
    const { account } = useAppSelector((state) => state.authentication);
    const navigate = useNavigate();

    const logout = () => {
        clearCookie();
        navigate("/login", { replace: true });
    };

    const itemDrops: MenuProps["items"] = [
        {
            key: "1",
            label: <Link to="/account">Thông tin tài khoản</Link>,
        },
        {
            key: "2",
            label: <div onClick={logout}>Đăng xuất</div>,
        },
    ];

    return (
        <div className="navbar">
            <span className="navbar-account-name">{account.accountName}</span>
            <Dropdown placement="bottomRight" menu={{ items: itemDrops }}>
                <div style={{ cursor: "pointer" }}>
                    {account.imageUrl ? (
                        <Avatar src={account.imageUrl} />
                    ) : (
                        <Avatar
                            style={{ backgroundColor: "#f56a00" }}
                            size="large"
                        >
                            <span
                                style={{ fontSize: "20px", fontWeight: "600" }}
                            >
                                {account.accountName.charAt(0).toUpperCase()}
                            </span>
                        </Avatar>
                    )}
                </div>
            </Dropdown>
        </div>
    );
};

export default Navbar;
