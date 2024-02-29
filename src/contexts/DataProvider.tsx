import React from 'react';
import { SectorsProvider, BrandsProvider } from './';
import { CustomersProvider } from './data/customers';

type DataProviderProps = {
    children: React.ReactNode;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    return (
        <SectorsProvider>
            <BrandsProvider>
                <CustomersProvider>
                    {children}
                </CustomersProvider>
            </BrandsProvider>
        </SectorsProvider>
    );
}