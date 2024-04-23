import {create} from "zustand";
import {ProductType} from "../types/ProductTypes.ts";
import {fetchAllProducts, fetchProductOptions} from "../services/api/products";
import {ProductOptionsType} from "../types/ProductTypes.ts";
import { firstOf } from "../utils/helpers/spells.ts";

type createSectorsStore = {
    products: ProductType[];
    productOptions: ProductOptionsType;
    vatRates: {label: string, value: string}[];
    productTypes: {label: string, value: string}[];
    measurementUnits: {label: string, value: string}[];
    loadingProducts: boolean;
    loadingOptions: boolean;
    setLoadingProducts: (loadingProducts: boolean) => void;
    fetchProducts: () => Promise<void>;
    fetchProductOptions: () => Promise<void>;
};

export const useStoreProducts = create<createSectorsStore>((set) => ({

    products: [],
    productOptions: {} as ProductOptionsType,
    vatRates: [],
    productTypes: [],
    measurementUnits: [],
    loadingProducts: false,
    loadingOptions: false,
    setLoadingProducts: (loadingProducts: boolean) => set({ loadingProducts }),
    fetchProducts: async () => {
        set({ loadingProducts: true });
        const response = await fetchAllProducts();
        set({ products: response as ProductType[] });
        set({ loadingProducts: false });
    },
    fetchProductOptions: async () => {
        set({ loadingOptions: true });
        const response = await fetchProductOptions();
        set({ productOptions: firstOf(response) as ProductOptionsType });
        const transformedProductOptions = transformProductOptions(firstOf(response) as ProductOptionsType);
        set({ vatRates: transformedProductOptions.vatRates });
        set({ productTypes: transformedProductOptions.ProductTypes });
        set({ measurementUnits: transformedProductOptions.measurementUnits });
        set({ loadingOptions: false });
    }
}));

const transformProductOptions = (productOptions: ProductOptionsType) => {
    const vatRatesDropdown: { label: string; value: string; }[] = [];
    Object.entries(productOptions.vat_rates).map(([key, value]) => {
        vatRatesDropdown.push({label: key, value: String(value)});
    });
    
    const productTypesDropdown: { label: string; value: string; }[] = [];
    Object.entries(productOptions.product_types).map(([key, value]) => {
        productTypesDropdown.push({label: key, value: String(value)});
    });

    const measurementUnitsDropdown: { label: string; value: string; }[] = [];
    Object.entries(productOptions.measurement_units).map(([key, value]) => {
        measurementUnitsDropdown.push({label: key, value: String(value)});
    });

    return {
        vatRates: vatRatesDropdown,
        ProductTypes: productTypesDropdown,
        measurementUnits: measurementUnitsDropdown
    };
}