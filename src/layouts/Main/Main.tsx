import { ReactNode, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Main.scss";
import { useAppSelector } from "../../redux/hook";
import { Spin } from "antd";

export interface MainProps {
    children: ReactNode;
}

const Main = ({ children }: MainProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const { account } = useAppSelector((state) => state.authentication);
    return (
        <div className="main">
            {Object.keys(account).length ? (
                <>
                    {" "}
                    <div className="_sidebar">
                        <Sidebar
                            collapsed={collapsed}
                            setCollapsed={() => setCollapsed(!collapsed)}
                        />
                    </div>
                    <div
                        className="_main"
                        style={{
                            width: collapsed
                                ? "calc(100vw - 85px)"
                                : "calc(100vw - 250px)",
                        }}
                    >
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
