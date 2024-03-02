import { DropdownOptions } from '../components/global/Dropdown';
import { SectorType } from '../types/SectorTypes';


/**
 * Formats a sector object into a dropdown option.
 * @param sector - The sector object to format.
 * @returns The formatted dropdown option.
 */
export const sectorDropdownOptionFormat = (sector: SectorType): DropdownOptions => {
    return {
        value: String(sector.id),
        label: String(sector.name)
    }
};