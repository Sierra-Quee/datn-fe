import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AdminRoutes from "./admin/AdminRoutes";
import Account from "./common/Account/Account";
import CommonRoutes from "./common/CommonRoutes";
import Home from "./common/Home/Home";
import { PrivateRoute } from "./core/auth/private-route";
import { Role } from "./core/auth/roles";
import ErrorBoundaryRoutes from "./core/errors/error-boundary-routes";
import { getAccount } from "./core/reducers/authentication";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { RoutePath } from "./routes";
import { ACCESS_TOKEN } from "./utils/constants";
import { getCookie } from "./utils/functions/cookies";

function App() {
    const { isAuthenticated } = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();
    const access_token = getCookie(ACCESS_TOKEN);

    useEffect(() => {
        dispatch(getAccount());
    }, [dispatch]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {(!access_token || (access_token && isAuthenticated)) && (
                <BrowserRouter>
                    <ErrorBoundaryRoutes>
                        <Route path="*" element={<CommonRoutes />} />
                        <Route
                            path={RoutePath.Account}
                            element={
                                <PrivateRoute
                                    roles={[
                                        Role.ROLE_USER,
                                        Role.ROLE_ADMIN,
                                        Role.ROLE_REPAIRMAN,
                                        Role.ROLE_SUPERADMIN,
                                    ]}
                                >
                                    <Account />
                                </PrivateRoute>
                            }
                        />

                        <Route path="admin/*" element={<AdminRoutes />} />
                    </ErrorBoundaryRoutes>
                </BrowserRouter>
            )}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
