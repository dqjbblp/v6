import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import TotalComponent from "./page/somecomponents/index.tsx";
import TankStackQueryProvider from "./providers/reactquery.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TankStackQueryProvider>
    <Provider store={store}>
      <App />
      <TotalComponent />
    </Provider>
    </TankStackQueryProvider>
  </BrowserRouter>
);
