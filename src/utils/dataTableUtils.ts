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