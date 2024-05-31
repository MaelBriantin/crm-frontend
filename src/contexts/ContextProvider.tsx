import React from "react";
import {
  AuthProvider,
  ToastProvider,
  ModalProvider,
  AppLoadingProvider,
  DeleteAlertProvider,
  FormActionsProvider,
  NewOrderActionsProvider,
} from ".";

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <AppLoadingProvider>
        <ToastProvider>
          <NewOrderActionsProvider>
            <DeleteAlertProvider>
              <FormActionsProvider>
                <ModalProvider>{children}</ModalProvider>
              </FormActionsProvider>
            </DeleteAlertProvider>
          </NewOrderActionsProvider>
        </ToastProvider>
      </AppLoadingProvider>
    </AuthProvider>
  );
};
