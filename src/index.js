import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // وارد کردن فایل CSS
import App from "./App";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
