import { SectorType } from "./SectorTypes";

export type CustomerType = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
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
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    createdAt: '',
    updatedAt: '',
    sector: {
        id: 0,
        name: '',
        postcodes: [],
        postcodes_count: 0,
        postcodes_list: ''
    },
    notes: ''
};