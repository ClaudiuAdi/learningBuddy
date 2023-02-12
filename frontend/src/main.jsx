import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SessionContextProvider } from "./context/SessionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
