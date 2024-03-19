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
    sector: SectorType | null;
    notes: string;
    is_active: boolean;
    visit_frequency: VisitFrequencyType | null;
    visit_day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday' | '' | null;
    visit_day_label: string | null;
    visit_schedule: string | null;
    relationship: RelationshipType | null;
};

export type VisitFrequencyType = {
    id: string;
    label: string;
    value: string;
};

export type RelationshipType = {
    id: string;
    label: string;
    value: string;
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
    sector: null,
    notes: '',
    is_active: true,
    visit_frequency: null,
    visit_day: null,
    visit_day_label: null,
    visit_schedule: null,
    relationship: null
};