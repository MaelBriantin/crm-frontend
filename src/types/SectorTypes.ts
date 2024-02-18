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