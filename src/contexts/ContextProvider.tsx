import React from "react";
import { 
    AuthProvider, 
    ToastProvider, 
    ModalProvider, 
    SectorsProvider, 
    AppLoadingProvider 
} from ".";

interface ContextProviderProps {
    children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    return (
        <AuthProvider>
            <AppLoadingProvider>
                <SectorsProvider>
                    <ToastProvider>
                        <ModalProvider>
                            {children}
                        </ModalProvider>
                    </ToastProvider>
                </SectorsProvider>
            </AppLoadingProvider>
        </AuthProvider>
    );
};