import { ColumnColorProps } from '../types/DataTableTypes';

/**
     * Get the color based on the columnColor array and the specified value.
     *
     * @param {Array} columnColor - An array of objects representing the column colors.
     * Each object should have the following properties:
     *   - {string|number} value - The value to match.
     *   - {string} background - The background color associated with the value.
     *   - {string} text - The text color associated with the value.
     *   - If the value is '*', the color will be applied to all values.
     *   - If the value is '*<number', the color will be applied to all values below the number.
     *   - If the value is '*>number', the color will be applied to all values above the number.
     *   - If the value is a string or a number, the color will be applied to that specific value.
     * @param {string|number} value - The value to match against the column names in the columnColor array.
     * @returns {Object|undefined} - An object containing background and text colors associated with the matched column name,
     * or undefined if no match is found.
     */
export const getColor = (columnColor: ColumnColorProps[] | undefined, value: string) => {
    if (columnColor && Array.isArray(columnColor)) {
        const wildcard = columnColor.find((color) => typeof color.value === 'string' && color.value.startsWith('*'));
        if (wildcard) {
            if (wildcard.value === '*') {
                return {
                    background: wildcard.background,
                    text: wildcard.text
                };
            }
            if (typeof wildcard.value === 'string' && wildcard.value.startsWith('*<')) {
                const threshold = parseInt(wildcard.value.substring(2));
                if (parseInt(value) < threshold) {
                    return {
                        background: wildcard.background,
                        text: wildcard.text
                    };
                }
            }
            if (typeof wildcard.value === 'string' && wildcard.value.startsWith('*>')) {
                const threshold = parseInt(wildcard.value.substring(2));
                if (parseInt(value) > threshold) {
                    return {
                        background: wildcard.background,
                        text: wildcard.text
                    };
                }
            }
        }
        const color = columnColor.find((color) => color.value == value);
        if (color && color.value == value) {
            return {
                background: color.background,
                text: color.text
            };
        }
    }
    return undefined;
};


/**
 * Highlights the searched value in a given value by wrapping it with <span> tags.
 * If the value is not a string or number, it returns the value as is.
 * 
 * @param searchedValue - The value to be searched for.
 * @param value - The value to be highlighted.
 * @returns The highlighted value.
 */
export const highlightSearchedValue = (searchedValue: string | number | undefined, value: string | number | boolean | string[]): string | number | boolean | string[] => {
    if (typeof value === 'string' || typeof value === 'number') {
        const isSearched = searchedValue && String(value).toLowerCase().includes(String(searchedValue).toLowerCase());
        if (isSearched) {
            return String(value).replace(new RegExp(String(searchedValue), 'gi'), (match: string) => `<span>${match}</span>`);
        }
    }
    return value;
}