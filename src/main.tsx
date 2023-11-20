import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productReducer.ts";
import cartReducer from "./features/cartReducer.ts"
import userLoginReducer from "./features/userLoginReducer.tsx"
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart:cartReducer,
    user:userLoginReducer
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
