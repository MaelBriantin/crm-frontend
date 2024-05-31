import {create} from "zustand";
import {BrandType} from "../types/BrandTypes.ts";
import {fetchAllBrands} from "../services/api/brands";

type createBrandsStore = {
    brands: BrandType[];
    brandsOptions: { value: string; label: string }[];
    loadingBrands: boolean;
    setLoadingBrands: (loadingBrands: boolean) => void;
    fetchBrands: () => Promise<void>;
};
export const useStoreBrands = create<createBrandsStore>((set) => ({
    brands: [],
    fetchBrands: async () => {
        set({loadingBrands: true});
        const response = await fetchAllBrands();
        set({brands: response as BrandType[]});
        set({brandsOptions: brandsToBrandsOptions(response as BrandType[])});
        set({loadingBrands: false});
    },
    brandsOptions: [],
    loadingBrands: false,
    setLoadingBrands: (loadingBrands: boolean) => set({loadingBrands}),
}));

const brandsToBrandsOptions = (brands: BrandType[]) => {
    return brands.map(brand => ({value: String(brand.id), label: brand.name}));
};