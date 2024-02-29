import React, { createContext, useState, useContext } from "react";
import { CustomerType } from "../../../types/CustomerTypes";
import { fetchAllCustomers } from "../../../services/api/customers";

type CustomerProviderProps = {
    children: React.ReactNode;
};

type CustomerContextValue = {
    customers: CustomerType[];
    setCustomers: React.Dispatch<React.SetStateAction<CustomerType[]>>;
    refreshCustomers: () => Promise<void>;
    loadingCustomers: boolean;
    setLoadingCustomers: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CustomersContext = createContext<CustomerContextValue>({
    customers: [],
    setCustomers: () => { },
    refreshCustomers: async () => { },
    loadingCustomers: false,
    setLoadingCustomers: () => { },
});

export const CustomersProvider: React.FC<CustomerProviderProps> = ({ children }) => {
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [loadingCustomers, setLoadingCustomers] = useState(false);

    const refreshCustomers = async () => {
        setLoadingCustomers(true);
        setCustomers(await fetchAllCustomers() as CustomerType[]);
        setLoadingCustomers(false);
    };

    const customerContextValue: CustomerContextValue = {
        customers,
        setCustomers,
        refreshCustomers,
        loadingCustomers,
        setLoadingCustomers,
    };

    return (
        <CustomersContext.Provider value={customerContextValue}>
            {children}
        </CustomersContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCustomers = () => useContext(CustomersContext);
