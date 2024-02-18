import React from "react";
import {
    AuthProvider,
    ToastProvider,
    ModalProvider,
    AppLoadingProvider,
} from ".";
import { DataProvider } from "./DataProvider";

interface ContextProviderProps {
    children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    return (
        <AuthProvider>
            <AppLoadingProvider>
                <DataProvider>
                    <ToastProvider>
                        <ModalProvider>
                            {children}
                        </ModalProvider>
                    </ToastProvider>
                </DataProvider>
            </AppLoadingProvider>
        </AuthProvider>
    );
};