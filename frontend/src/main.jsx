import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SessionContextProvider } from "./context/SessionContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SessionContextProvider>
        <App />
      </SessionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
