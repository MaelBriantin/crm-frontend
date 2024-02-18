import { ColumnProps, RowDataType, RowDataValueTypes } from '../types/DataTableTypes';

/**
 * Performs a wildcard search on the given value based on the search criteria.
 * @param search - The search criteria, which can be a string or a number.
 * @param value - The value to be searched.
 * @param key - The key associated with the value.
 * @param columnText - The text of the column associated with the value.
 * @returns True if the value matches the search criteria, false otherwise.
 */
export const wildcardSearch = (
    search: string | number,
    value: RowDataValueTypes,
    columnText: string) => {
    if (typeof search === 'string' && search.charAt(0) === '*') {
        const searchQuery = search.slice(1);
        const operators = ['<', '>', '='];
        const operator = operators.find(op => searchQuery.includes(op));
        if (operator) {
            const [searchValue, searchKey] = searchQuery.split(operator)[1].split(':');
            if (searchKey && !columnText.toLowerCase().includes(searchKey.toLowerCase())) {
                return false;
            }
            if (searchValue) {
                switch (operator) {
                    case '<':
                        return Number(value) < Number(searchValue);
                    case '>':
                        return Number(value) > Number(searchValue);
                    case '=':
                        return String(value) === String(searchValue);
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

/**
 * Performs an advanced search on the given data based on the search criteria.
 * @param data - The data to be searched.
 * @param searchedColumn - The column to be searched.
 * @param searchedOperator - The operator to be used for the search.
 * @param search - The search criteria.
 * @param columns - The columns associated with the data.
 * @returns The filtered data based on the search criteria.
 */
export const advancedFilter = (data: RowDataType[], searchedColumn: string, searchedOperator: string, search: string, columns: ColumnProps[]) => {
    
    // Get the keys of the columns passed
    const columnKeys = columns.map(column => column.value);

    const result = data.filter((row: RowDataType) => {
        return Object.entries(row).some(([key, value]: [string, RowDataValueTypes]) => {
            // Ignore the keys that are not present in the columns
            if (!columnKeys.includes(key)) {
                return false;
            }

            if (searchedColumn && searchedColumn !== key) {
                return false;
            }

            const column = columns.find((column) => column.value === key);
            const columnText = column ? column.text : '';

            switch (searchedOperator) {
                case '>':
                    return Number(value) < Number(search);
                case '<':
                    return Number(value) > Number(search);
                case '=':
                    return String(value) === String(search);
                default:
                    return wildcardSearch(search, value, columnText);
            }
        });
    });
    return result;
}
// export const advancedFilter_old = (data: RowDataType[], searchedColumn: string, searchedOperator: string, search: string, columns: ColumnProps[]) => {
    
//     // Get the keys of the data passed
//     const dataKeys = Object.keys(firstOf(data) as RowDataType);
//     // Get the keys of the columns passed
//     const columnKeys = columns.map(column => column.value);
//     // Store the keys that are not present in the columns
//     const missingKeys = dataKeys.filter(key => !columnKeys.includes(key));
//     // Remove the keys that are not present in the columns from the data
//     const filteredData = removeKeys(data, missingKeys) as RowDataType[];

//     const result = filteredData.filter((row: RowDataType) => {

//         return Object.entries(row).some(([key, value]: [string, RowDataValueTypes]) => {
//             if (searchedColumn && searchedColumn !== key) {
//                 return false;
//             }

//             const column = columns && columns.find((column) => column.value === key);
//             const columnText = column ? column.text : '';

//             switch (searchedOperator) {
//                 case '>':
//                     return Number(value) < Number(search);
//                 case '<':
//                     return Number(value) > Number(search);
//                 case '=':
//                     return String(value) === String(search);
//                 default:
//                     return wildcardSearch(search, value, columnText);
//             }
//         });

//     });
//     return result;
// }

