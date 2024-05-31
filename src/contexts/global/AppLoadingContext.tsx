import React, { createContext, useContext, useEffect, useState } from 'react';
import { Loader } from '../../components/global';

type AppLoadingContextType = {
    appLoading: boolean;
    setAppLoading: (appLoading: boolean) => void;
};

const AppLoadingContext = createContext<AppLoadingContextType>({
    appLoading: false,
    setAppLoading: () => { }
});

type AppLoadingProviderProps = {
    children: React.ReactNode;
};

export const AppLoadingProvider: React.FC<AppLoadingProviderProps> = ({ children }) => {
    const [appLoading, setAppLoading] = useState(false);

    const AppLoadingContextValue: AppLoadingContextType = {
        appLoading,
        setAppLoading
    };

    useEffect(() => {
        appLoading 
            ? document.body.style.cursor = 'progress' 
            : document.body.style.cursor = 'default';
    }, [appLoading]);

    return (
        <AppLoadingContext.Provider value={AppLoadingContextValue}>
            {children}
            {appLoading && 
                <Loader transparent />}
        </AppLoadingContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppLoading = () => useContext(AppLoadingContext);