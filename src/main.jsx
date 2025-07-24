import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import { ListingsProvider } from "./context/ListingsContext"; 
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        fallbackRedirectUrl="/dashboard"
        afterSignOutUrl="/"
      >
        <ListingsProvider>
          <App />
        </ListingsProvider>
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);