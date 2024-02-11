import React from "react";
import { AuthProvider, ToastProvider, ModalProvider } from ".";

interface ContextProviderProps {
    children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
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