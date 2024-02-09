import React from "react";
import { AuthProvider } from "./auth/AuthContext";
import { ToastProvider } from "./global/ToastContext";
import { ModalProvider } from "./global/ModalContext";

interface GlobalContextProviderProps {
    children: React.ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({children}) => {
    return (
        <AuthProvider>
            <ToastProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </ToastProvider>
        </AuthProvider>
    );
};