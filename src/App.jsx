

import React from "react";
import Routes from "./Routes";
import { CartProvider } from "./components/CartContext";
import { ToastProvider } from "./components/ui/Toast";



function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
