import { createContext, useEffect } from "react";
import Footer from "./component/footer";
import Header from "./component/header";
import SelfRouter from "./router";
import userNameStore from "./store/useUserStore";
import { useTranslation } from "react-i18next";

export const MuContext = createContext<{ count: number }>({ count: 0 });

function App() {
  const { i18n } = useTranslation();
  const { age } = userNameStore();
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  return (
    <MuContext.Provider value={{ count: age }}>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <SelfRouter />
        <div style={{ marginTop: "auto" }}>
          <Footer />
        </div>
      </div>
    </MuContext.Provider>
  );
}

export default App;
