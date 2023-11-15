import React from "react";
import Public from "../../../layouts/Public/Public";
import Profile from "./Profile";
import { useAppSelector } from "../../../redux/hook";

const CustomerProfile = () => {
    const { account } = useAppSelector((state) => state.authentication);
    return <Profile account={account} />;
};

export default CustomerProfile;
