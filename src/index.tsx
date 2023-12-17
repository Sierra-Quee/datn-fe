import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./style.scss";
import App from "./App";
import { store } from "./redux/store";
import ErrorBoundary from "./core/errors/error-boundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>
    // </React.StrictMode>
);
