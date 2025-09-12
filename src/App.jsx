

import React from "react";
import Routes from "./Routes";
import { CartProvider } from "./components/CartContext";
import { ToastProvider } from "./components/ui/Toast";
import { TranslationProvider } from "./utils/i18n.jsx";
import EnaChatbot from "./components/EnaChatbot";

function App() {
  return (
    <TranslationProvider>
      <ToastProvider>
        <CartProvider>
          <Routes />
          <EnaChatbot />
        </CartProvider>
      </ToastProvider>
    </TranslationProvider>
  );
}

export default App;
