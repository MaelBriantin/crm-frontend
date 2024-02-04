import { RowDataValueTypes } from '../types/DataTableTypes';

/**
 * Performs a wildcard search on the given value based on the search criteria.
 * @param search - The search criteria, which can be a string or a number.
 * @param value - The value to be searched.
 * @param key - The key associated with the value.
 * @param columnText - The text of the column associated with the value.
 * @returns True if the value matches the search criteria, false otherwise.
 */
export const wildcardSearch = (search: string | number, value: RowDataValueTypes, columnText: string) => {
    console.log('columnText', columnText);
    if (typeof search === 'string' && search.charAt(0) === '*') {
        const searchQuery = search.slice(1);
        const operators = ['<', '>', '='];
        const operator = operators.find(op => searchQuery.includes(op));
        if (operator) {
            const [searchValue, searchKey] = searchQuery.split(operator)[1].split(':');
            console.log('operator', operator);
            console.log('searchValue', searchValue);
            if (searchKey && !columnText.toLowerCase().includes(searchKey.toLowerCase())) {
                return false;
            }
            if (searchValue) {
                if (operator === '<') {
                    console.log('value', value);
                    return Number(value) < Number(searchValue);
                } else if (operator === '>') {
                    console.log('value', value);
                    return Number(value) > Number(searchValue);
                } else if (operator === '=') {
                    return Number(value) === Number(searchValue);
                }
            } else {
                return String(value).toLowerCase().includes(String('').toLowerCase());
            }
        } else {
            return String(value).toLowerCase().includes(String(searchQuery).toLowerCase());
        }
    } else {
        return String(value).toLowerCase().includes(String(search).toLowerCase());
    }
}
