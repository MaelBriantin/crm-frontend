export type SectorType = {
    id: number;
    name: string;
    postcodes: PostcodeType[];
};

export type PostcodeType = {
    id?:        number;
    postcode:  string;
    sector_id?: number;
    city:      string;
    sector?:    SectorType;
};