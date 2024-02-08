import React from "react";
import { AuthProvider } from "./auth/AuthContext";
import { ToastProvider } from "./global/ToastContext";

interface GlobalContextProviderProps {
    children: React.ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({children}) => {
    return (
        <AuthProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </AuthProvider>
    );
};