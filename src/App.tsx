import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { PrivateRoute } from "./core/auth/private-route";
import { Role } from "./core/auth/roles";
import LogIn from "./components/Login/LogIn";
import SignUp from "./components/Signup/SignUp";
import { RoutePath } from "./routes";
import ErrorBoundaryRoutes from "./core/errors/error-boundary-routes";
import { Home } from "./components/Home/home";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { useEffect } from "react";
import { getAccount } from "./core/reducers/authentication";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "./utils/functions/cookies";
import { ACCESS_TOKEN } from "./utils/constants";
import NotFound from "./layouts/NotFound/NotFound";
import Account from "./components/Account/Account";

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
