import { Route } from "react-router-dom";
import ErrorBoundaryRoutes from "../core/errors/error-boundary-routes";
import { PublicRoutes } from "../routes";
import { IRoutePath } from "../utils/model";

const CommonRoutes = () => {
    return (
        <ErrorBoundaryRoutes>
            {PublicRoutes.map((route: IRoutePath) => {
                const Layout = route.layout;
                const Component = route.component;

                return (
                    <Route
                        index={route.path === ""}
                        key={route.path}
                        path={route.path}
                        element={
                            Layout ? (
                                <Layout>
                                    <Component />
                                </Layout>
                            ) : (
                                <Component />
                            )
                        }
                    />
                );
            })}
        </ErrorBoundaryRoutes>
    );
};

export default CommonRoutes;
