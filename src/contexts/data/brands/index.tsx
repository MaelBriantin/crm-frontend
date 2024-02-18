import React, { createContext, useState, useContext } from "react";
import { BrandType } from "../../../types/BrandTypes";
import { fetchAllBrands } from "../../../services/api/brands";

type brandProviderProps = {
    children: React.ReactNode;
};

type BrandContextValue = {
    brands: BrandType[];
    setBrands: React.Dispatch<React.SetStateAction<BrandType[]>>;
    refreshBrands: () => Promise<void>;
    loadingBrands: boolean;
    setLoadingBrands: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BrandsContext = createContext<BrandContextValue>({
    brands: [],
    setBrands: () => { },
    refreshBrands: async () => { },
    loadingBrands: false,
    setLoadingBrands: () => { },
});

export const BrandsProvider: React.FC<brandProviderProps> = ({ children }) => {
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [loadingBrands, setLoadingBrands] = useState(false);

    const refreshBrands = async () => {
        setLoadingBrands(true);
        setBrands(await fetchAllBrands() as BrandType[]);
        setLoadingBrands(false);
    };

    const brandContextValue: BrandContextValue = {
        brands,
        setBrands,
        refreshBrands,
        loadingBrands,
        setLoadingBrands,
    };

    return (
        <BrandsContext.Provider value={brandContextValue}>
            {children}
        </BrandsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBrands = () => useContext(BrandsContext);
