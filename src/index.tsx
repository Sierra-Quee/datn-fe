import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";
import { RoutePath } from "./routes";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./feature/redux/store";
import LogIn from "./feature/Login/LogIn";
import SignUp from "./feature/Signup/SignUp";
import { Home } from "./feature/Home/home";
import ErrorBoundaryRoutes from "./core/errors/error-boundary-routes";
import { PrivateRoute } from "./core/auth/private-route";
import { Role } from "./core/auth/roles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ErrorBoundaryRoutes>
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
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
                </ErrorBoundaryRoutes>
            </BrowserRouter>
        </Provider>
        <ToastContainer position="top-right" autoClose={3000} />
    </React.StrictMode>
);
