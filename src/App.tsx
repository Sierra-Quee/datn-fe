import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Account from "./components/Account/Account";
import { Home } from "./components/Home/home";
import LogIn from "./components/Login/LogIn";
import SignUp from "./components/Signup/SignUp";
import { PrivateRoute } from "./core/auth/private-route";
import { Role } from "./core/auth/roles";
import ErrorBoundaryRoutes from "./core/errors/error-boundary-routes";
import { getAccount } from "./core/reducers/authentication";
import NotFound from "./layouts/NotFound/NotFound";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { RoutePath } from "./routes";
import { ACCESS_TOKEN } from "./utils/constants";
import { getCookie } from "./utils/functions/cookies";
import { Skill } from "./components/Skill/Skill";
import AdminServiceRoute from "./routes/adminServiceRoute";

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
                        <Route path={RoutePath.Login} element={<LogIn />} />
                        <Route path={RoutePath.SignUp} element={<SignUp />} />
                        <Route
                            index
                            element={
                                <PrivateRoute
                                    roles={[
                                        Role.ROLE_USER,
                                        Role.ROLE_ADMIN,
                                        Role.ROLE_REPAIRMAN,
                                    ]}
                                >
                                    <Home />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path={RoutePath.Account}
                            element={
                                <PrivateRoute
                                    roles={[
                                        Role.ROLE_USER,
                                        Role.ROLE_ADMIN,
                                        Role.ROLE_REPAIRMAN,
                                    ]}
                                >
                                    <Account />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path={RoutePath.Skill}
                            element={
                                <PrivateRoute roles={[Role.ROLE_ADMIN]}>
                                    <Skill />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path={`${RoutePath.Service}/*`}
                            element={
                                <PrivateRoute roles={[Role.ROLE_ADMIN]}>
                                    <AdminServiceRoute />
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
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
