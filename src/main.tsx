import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/styles/fonts";
import "@/styles/main.scss";
import { App } from "@/App";
import { CartProvider } from "@/context/cart/CartProvider";
import { BagDrawerProvider } from "@/context/bag/BagDrawerProvider";

const root = document.getElementById("root");
if (!root) throw new Error("#root is missing from index.html");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <BagDrawerProvider>
          <App />
        </BagDrawerProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
