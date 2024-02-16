import { SectorType } from "../../types/SectorTypes";
import React, { createContext, useState, useContext } from "react";
import { fetchAllSectors } from "../../services/api/sectors";

type SectorProviderProps = {
    children: React.ReactNode;
};

type SectorContextValue = {
    sectors: SectorType[];
    setSectors: React.Dispatch<React.SetStateAction<SectorType[]>>;
    refreshSectors: () => Promise<void>;
    loadingSectors: boolean;
    setLoadingSectors: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SectorsContext = createContext<SectorContextValue>({
    sectors: [],
    setSectors: () => { },
    refreshSectors: async () => { },
    loadingSectors: false,
    setLoadingSectors: () => { },
});

export const SectorsProvider: React.FC<SectorProviderProps> = ({ children }) => {
    const [sectors, setSectors] = useState<SectorType[]>([]);
    const [loadingSectors, setLoadingSectors] = useState(false);

    const refreshSectors = async () => {
        setLoadingSectors(true);
        setSectors(await fetchAllSectors() as SectorType[]);
        setLoadingSectors(false);
    };

    const sectorContextValue: SectorContextValue = {
        sectors,
        setSectors,
        refreshSectors,
        loadingSectors,
        setLoadingSectors,
    };

    return (
        <SectorsContext.Provider value={sectorContextValue}>
            {children}
        </SectorsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSectors = () => useContext(SectorsContext);
