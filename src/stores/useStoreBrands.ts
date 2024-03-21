import {create} from "zustand";
import {BrandType} from "../types/BrandTypes.ts";
import {fetchAllBrands} from "../services/api/brands";

type createBrandsStore = {
    brands: BrandType[];
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
        set({loadingBrands: false});
    },

    loadingBrands: false,
    setLoadingBrands: (loadingBrands: boolean) => set({loadingBrands}),
}));