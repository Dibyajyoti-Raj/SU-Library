import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import { AuthProvider } from "./Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </SnackbarProvider>
);
