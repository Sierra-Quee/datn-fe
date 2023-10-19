import { Outlet, Route, RouteProps, Routes } from "react-router-dom";
import ErrorBoundary from "./error-boundary";

const ErrorBoundaryRoutes = ({ children }: RouteProps) => {
    return (
        <Routes>
            <Route
                element={
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                }
            >
                {children}
            </Route>
        </Routes>
    );
};

export default ErrorBoundaryRoutes;
