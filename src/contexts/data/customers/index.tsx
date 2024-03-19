import React, { createContext, useState, useContext } from "react";
import { CustomerType, VisitFrequencyType, RelationshipType } from "../../../types/CustomerTypes";
import { fetchAllCustomers, fetchCustomerFrequencies, fetchCustomerRelationships } from "../../../services/api/customers";

type CustomerProviderProps = {
    children: React.ReactNode;
};

type CustomerContextValue = {
    customers: CustomerType[];
    setCustomers: React.Dispatch<React.SetStateAction<CustomerType[]>>;
    refreshCustomers: () => Promise<void>;
    visitFrequencies: VisitFrequencyType[];
    setVisitFrequencies: React.Dispatch<React.SetStateAction<VisitFrequencyType[]>>;
    relationships: RelationshipType[];
    setRelationships: React.Dispatch<React.SetStateAction<RelationshipType[]>>;
    getVisitsOptions: () => Promise<void>;
    loadingCustomers: boolean;
    setLoadingCustomers: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CustomersContext = createContext<CustomerContextValue>({
    customers: [],
    setCustomers: () => { },
    refreshCustomers: async () => { },
    visitFrequencies: [],
    setVisitFrequencies: () => { },
    relationships: [],
    setRelationships: () => { },
    getVisitsOptions: async () => { },
    loadingCustomers: false,
    setLoadingCustomers: () => { },
});

export const CustomersProvider: React.FC<CustomerProviderProps> = ({ children }) => {
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [loadingCustomers, setLoadingCustomers] = useState(false);
    const [visitFrequencies, setVisitFrequencies] = useState<VisitFrequencyType[]>([]);
    const [relationships, setRelationships] = useState<RelationshipType[]>([]);

    const refreshCustomers = async () => {
        setLoadingCustomers(true);
        setCustomers(await fetchAllCustomers() as CustomerType[]);
        setLoadingCustomers(false);
    };

    const getVisitsOptions = async () => {
        const frequencies = await fetchCustomerFrequencies();
        const relationships = await fetchCustomerRelationships();
        setVisitFrequencies(frequencies);
        setRelationships(relationships);
    }

    const customerContextValue: CustomerContextValue = {
        customers,
        setCustomers,
        refreshCustomers,
        visitFrequencies,
        setVisitFrequencies,
        relationships,
        setRelationships,
        getVisitsOptions,
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
