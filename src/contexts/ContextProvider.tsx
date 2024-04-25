import React from "react";
import {
    AuthProvider,
    ToastProvider,
    ModalProvider,
    AppLoadingProvider,
    DeleteAlertProvider,
    FormActionsProvider,
    NewOrderActionsProvider
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
                            <NewOrderActionsProvider>
                            <ModalProvider>
                                {children}
                            </ModalProvider>
                            </NewOrderActionsProvider>
                        </FormActionsProvider>
                    </DeleteAlertProvider>
                </ToastProvider>
            </AppLoadingProvider>
        </AuthProvider>
    );
};