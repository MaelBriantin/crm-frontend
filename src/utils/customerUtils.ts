import { DropdownOptions } from '../components/global/Dropdown';
import { SectorType } from '../types/SectorTypes';



/**
 * Formats a sector object into a dropdown option. If the sector is null, it will return 'Hors secteur'.
 * @param sector - The sector object to format.
 * @returns The formatted dropdown option.
 */
export const sectorDropdownOptionFormat = (sector: SectorType): DropdownOptions => {
    if(!sector) {
        return {
            value: '0',
            label: 'Hors secteur'
        }
    } else {
        return {
            value: String(sector.id),
            label: String(sector.name)
        }
    }
};