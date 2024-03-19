import React from "react";
import {
    AuthProvider,
    ToastProvider,
    ModalProvider,
    AppLoadingProvider,
    DeleteAlertProvider,
    FormActionsProvider,
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
                            <FormActionsProvider>
                                <ModalProvider>
                                    {children}
                                </ModalProvider>
                            </FormActionsProvider>
                        </DeleteAlertProvider>
                    </ToastProvider>
                </DataProvider>
            </AppLoadingProvider>
        </AuthProvider>
    );
};