import path from "path";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RoutePath } from "./routes";
import { UserRole } from "./feature/Auth/model";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./feature/redux/store";
import LogIn from "./feature/Login/LogIn";
import SignUp from "./feature/Signup/SignUp";
import { Home } from "./feature/Home/Home";

const router = createBrowserRouter([
    {
        path: RoutePath.Login,
        element: <LogIn />
    },
    {
        path: RoutePath.Signup,
        element: <SignUp />
    },
    {
        path: RoutePath.Home,
        element: <Home />
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
        <ToastContainer position="top-right" autoClose={3000} />
    </React.StrictMode>
);
