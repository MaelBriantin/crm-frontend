import { SectorType } from "./SectorTypes";

export type CustomerType = {
    id: string;
    firstname: string;
    lastname: string;
    full_name: string;
    email: string;
    phone: string;
    full_address?: string;
    address: string;
    city: string;
    postcode: string;
    createdAt: string;
    updatedAt: string;
    sector: SectorType;
    notes: string;
};

export const emptyCustomer: CustomerType = {
    id: '',
    firstname: '',
    lastname: '',
    full_name: '',
    email: '',
    phone: '',
    full_address: '',
    address: '',
    city: '',
    postcode: '',
    createdAt: '',
    updatedAt: '',
    sector: {
        id: null,
        name: '',
        postcodes: [],
        postcodes_count: 0,
        postcodes_list: ''
    },
    notes: ''
};