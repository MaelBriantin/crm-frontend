import React from 'react';
import { SectorsProvider, BrandsProvider } from './';

type DataProviderProps = {
    children: React.ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    return (
        <SectorsProvider>
            <BrandsProvider>
                {children}
            </BrandsProvider>
        </SectorsProvider>
    );
}