import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/themeProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./lib/store.ts";
import UserProvider from "./context/ContextProvider.tsx";
import { Toaster } from "@/components/ui/toaster";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Provider store={store}>
                <UserProvider>
                    <BrowserRouter>
                        <App />
                        <Toaster />
                    </BrowserRouter>
                </UserProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
