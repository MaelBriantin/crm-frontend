import {create} from "zustand";
import {SectorType} from "../types/SectorTypes.ts";
import {fetchAllSectors} from "../services/api/sectors";

type createSectorsStore = {
    sectors: SectorType[];
    loadingSectors: boolean;
    setLoadingSectors: (loadingSectors: boolean) => void;
    fetchSectors: () => Promise<void>;
};

export const useStoreSectors = create<createSectorsStore>((set) => ({

    sectors: [],
    loadingSectors: false,
    setLoadingSectors: (loadingSectors: boolean) => set({ loadingSectors }),
    fetchSectors: async () => {
        set({ loadingSectors: true });
        const response = await fetchAllSectors('withPostcodes');
        set({ sectors: response as SectorType[] });
        set({ loadingSectors: false });
    },

}));