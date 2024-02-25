export type BrandType = {
    id: number;
    name: string;
    sku_code: string;
    notes: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    address: string;
    city: string;
    postcode: string;
    createdAt: string;
    updatedAt: string;
};

export const emptyBrand: BrandType = {
    id: 0,
    name: '',
    sku_code: '',
    notes: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    city: '',
    postcode: '',
    createdAt: '',
    updatedAt: ''
};