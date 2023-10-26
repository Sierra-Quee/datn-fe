import { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Main.scss";
import { useAppSelector } from "../../redux/hook";
import { Spin } from "antd";

export interface MainProps {
    children: ReactNode;
}

const Main = ({ children }: MainProps) => {
    const { account } = useAppSelector((state) => state.authentication);
    return (
        <div className="main">
            {Object.keys(account).length ? (
                <>
                    {" "}
                    <div className="_sidebar">
                        <Sidebar />
                    </div>
                    <div className="_main">
                        <div className="_navbar">
                            <Navbar />
                        </div>
                        <div className="_main_child">{children}</div>
                    </div>
                </>
            ) : (
                <Spin></Spin>
            )}
        </div>
    );
};

export default Main;
