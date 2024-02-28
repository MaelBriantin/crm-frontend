import React from "react";
import {
    AuthProvider,
    ToastProvider,
    ModalProvider,
    AppLoadingProvider,
    DeleteAlertProvider,
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
                        <DeleteAlertProvider>
                            <ModalProvider>
                                {children}
                            </ModalProvider>
                        </DeleteAlertProvider>
                    </ToastProvider>
                </DataProvider>
            </AppLoadingProvider>
        </AuthProvider>
    );
};