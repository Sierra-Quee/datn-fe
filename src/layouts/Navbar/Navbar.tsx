import { Avatar, Dropdown, MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import "./Navbar.scss";
import { clearCookie } from "../../utils/functions/cookies";
import { resetAuth } from "../../core/reducers/authentication";
import { useEffect } from "react";

const Navbar = () => {
    const { account } = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    console.log({ account });
    const logout = () => {
        clearCookie();
        dispatch(resetAuth());
    };

    useEffect(() => {
        if (!Object.keys(account).length) {
            navigate("/login");
        }
    }, [account, navigate]);

    const itemDrops: MenuProps["items"] = [
        {
            key: "1",
            label: <Link to="/account">Thiết lập tài khoản</Link>,
        },
        {
            key: "2",
            label: <div onClick={logout}>Đăng xuất</div>,
        },
    ];

    return (
        <div className="navbar">
            <span className="navbar-account-name">
                {account.accountName || account.lastName + account.firstName}
            </span>
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
                                {(
                                    account.accountName[0] || account.firstName
                                ).toUpperCase()}
                            </span>
                        </Avatar>
                    )}
                </div>
            </Dropdown>
        </div>
    );
};

export default Navbar;
