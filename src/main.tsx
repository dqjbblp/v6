import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import TotalComponent from "./page/somecomponents/index.tsx";
import TankStackQueryProvider from "./providers/reactquery.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Auth0ProviderWithHistory from "./auth0.tsx";
import "./Locales/index.ts";
import { WebsocketProvider } from "./providers/websocketProvider.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ConnectAndLogin from "./component/ConnectAndLogin.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TonConnectUIProvider
      manifestUrl={`${window.location.origin}/ton-manifest.json`}
    >
      <WebsocketProvider>
        <TankStackQueryProvider>
          <Provider store={store}>
            <GoogleOAuthProvider clientId="59803650015-eqh0s59imo6gafg6gdp61n9althhajmo.apps.googleusercontent.com">
              <Auth0ProviderWithHistory>
                {/* 这里的TotalComponent必须在<App />前面,
                因为TotalComponent里的axios要在前面,
                如果不在前面,
                会默认已本地的localhost为默认的url调一次接口,
                其次就是当用滚动刷新的接口时,要多写一个依赖项
                */}

                <TotalComponent />
                <ConnectAndLogin />
                <App />
              </Auth0ProviderWithHistory>
            </GoogleOAuthProvider>
          </Provider>
        </TankStackQueryProvider>
      </WebsocketProvider>
    </TonConnectUIProvider>
  </BrowserRouter>
);
