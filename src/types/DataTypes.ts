export type SectorType = {
    id: number;
    name: string;
    postcodes: PosctoceType[];
};

export type PosctoceType = {
    id:        number;
    postcode:  string;
    sector_id: number;
    sector?:    SectorType;
};