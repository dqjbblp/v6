import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";
import "./index.css"
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import TotalComponent from "./page/somecomponents/index.tsx";
import TankStackQueryProvider from "./providers/reactquery.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Auth0ProviderWithHistory from "./auth0.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TankStackQueryProvider>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="59803650015-eqh0s59imo6gafg6gdp61n9althhajmo.apps.googleusercontent.com">
          <Auth0ProviderWithHistory>
            <App />
            <TotalComponent />
          </Auth0ProviderWithHistory>
        </GoogleOAuthProvider>
      </Provider>
    </TankStackQueryProvider>
  </BrowserRouter>
);
