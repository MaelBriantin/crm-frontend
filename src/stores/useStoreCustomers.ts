import {
  fetchAllCustomers,
  fetchCustomerFrequencies,
  fetchCustomerRelationships,
  fetchCustomerDetails,
} from "../services/api/customers";
import {
  CustomerDetailsType,
  CustomerType,
  RelationshipType,
  VisitFrequencyType,
  emptyCustomerDetails,
} from "../types/CustomerTypes.ts";
import { create } from "zustand";
import { firstOf } from "../utils/helpers/spells.ts";

type createCustomersStore = {
  customers: CustomerType[];
  customerDetails: CustomerDetailsType;
  relationships: RelationshipType[];
  visitFrequencies: VisitFrequencyType[];
  loadingCustomers: boolean;
  loadingCustomerDetails: boolean;
  loadingVisitsOptions: boolean;
  setLoadingCustomers: (loadingCustomers: boolean) => void;
  fetchCustomers: () => Promise<void>;
  fetchCustomerDetails: (customerId: CustomerType["id"]) => Promise<void>;
  fetchVisitsOptions: () => Promise<void>;
  daysOfWeek: { value: string; label: string }[];
};

export const useStoreCustomers = create<createCustomersStore>((set) => ({
  customers: [],
  customerDetails: emptyCustomerDetails,
  fetchCustomers: async () => {
    set({ loadingCustomers: true });
    const response = await fetchAllCustomers();
    set({ customers: response as CustomerType[] });
    set({ loadingCustomers: false });
  },

  fetchCustomerDetails: async (customerId) => {
    set({ loadingCustomerDetails: true });
    const response = await fetchCustomerDetails(Number(customerId));
    set({ customerDetails: firstOf(response) as CustomerDetailsType });
    set({ loadingCustomerDetails: false });
  },

  loadingCustomerDetails: false,
  loadingCustomers: false,
  setLoadingCustomers: (loadingCustomers: boolean) => set({ loadingCustomers }),

  relationships: [],
  visitFrequencies: [],
  loadingVisitsOptions: false,
  fetchVisitsOptions: async () => {
    set({ loadingVisitsOptions: true });
    const frequencies = await fetchCustomerFrequencies();
    const relationships = await fetchCustomerRelationships();
    set({ visitFrequencies: frequencies });
    set({ relationships });
    set({ loadingVisitsOptions: false });
  },

  daysOfWeek: [
    { value: "", label: "Aucun" },
    { value: "monday", label: "Lundi" },
    { value: "tuesday", label: "Mardi" },
    { value: "wednesday", label: "Mercredi" },
    { value: "thursday", label: "Jeudi" },
    { value: "friday", label: "Vendredi" },
    { value: "saturday", label: "Samedi" },
    { value: "sunday", label: "Dimanche" },
  ],
}));
