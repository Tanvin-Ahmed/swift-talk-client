import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.js";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import SettingsProvider from "./contexts/SettingsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <HelmetProvider>
        <SettingsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SettingsProvider>
      </HelmetProvider>
    </ReduxProvider>
  </React.StrictMode>
);