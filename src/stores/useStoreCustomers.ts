import {fetchAllCustomers, fetchCustomerFrequencies, fetchCustomerRelationships} from "../services/api/customers";
import {CustomerType, RelationshipType, VisitFrequencyType} from "../types/CustomerTypes.ts";
import {create} from "zustand";

type createCustomersStore = {
    customers: CustomerType[];
    relationships: RelationshipType[];
    visitFrequencies: VisitFrequencyType[];
    loadingCustomers: boolean;
    loadingVisitsOptions: boolean;
    setLoadingCustomers: (loadingCustomers: boolean) => void;
    fetchCustomers: () => Promise<void>;
    fetchVisitsOptions: () => Promise<void>;
    daysOfWeek: { value: string, label: string }[];
};

export const useStoreCustomers = create<createCustomersStore>((set) => ({
    customers: [],
    fetchCustomers: async () => {
        set({loadingCustomers: true});
        const response = await fetchAllCustomers();
        set({customers: response as CustomerType[]});
        set({loadingCustomers: false});
    },

    loadingCustomers: false,
    setLoadingCustomers: (loadingCustomers: boolean) => set({loadingCustomers}),

    relationships: [],
    visitFrequencies: [],
    loadingVisitsOptions: false,
    fetchVisitsOptions: async () => {
        set({loadingVisitsOptions: true});
        const frequencies = await fetchCustomerFrequencies();
        const relationships = await fetchCustomerRelationships();
        set({visitFrequencies: frequencies});
        set({relationships});
        set({loadingVisitsOptions: false});
    },

    daysOfWeek: [
        {value: '', label: 'Aucun'},
        {value: 'monday', label: 'Lundi'},
        {value: 'tuesday', label: 'Mardi'},
        {value: 'wednesday', label: 'Mercredi'},
        {value: 'thursday', label: 'Jeudi'},
        {value: 'friday', label: 'Vendredi'},
        {value: 'saturday', label: 'Samedi'},
        {value: 'sunday', label: 'Dimanche'}
    ]
}));