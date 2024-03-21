import React from "react";
import {
    AuthProvider,
    ToastProvider,
    ModalProvider,
    AppLoadingProvider,
    DeleteAlertProvider,
    FormActionsProvider,
} from ".";

interface ContextProviderProps {
    children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    return (
        <AuthProvider>
            <AppLoadingProvider>
                <ToastProvider>
                    <DeleteAlertProvider>
                        <FormActionsProvider>
                            <ModalProvider>
                                {children}
                            </ModalProvider>
                        </FormActionsProvider>
                    </DeleteAlertProvider>
                </ToastProvider>
            </AppLoadingProvider>
        </AuthProvider>
    );
};