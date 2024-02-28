export type SectorType = {
    id: number;
    name: string;
    postcodes: PostcodeType[];
    postcodes_count: number;
    postcodes_list: string;
};

export type PostcodeType = {
    id?:        number;
    postcode:  string;
    sector_id?: number;
    city:      string;
    sector?:    SectorType;
};

export const emptySector: SectorType = {
    id: 0,
    name: '',
    postcodes: [],
    postcodes_count: 0,
    postcodes_list: '',
};