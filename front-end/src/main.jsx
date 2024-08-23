import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import reportWebVitals from "../src/reportWebVitals.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);

reportWebVitals();
