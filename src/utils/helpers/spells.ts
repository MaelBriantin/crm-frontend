/**
 * Checks if an array or object is empty.
 *
 * @param {Array<String|Number> | Object} element - The array or object to check.
 * @returns {boolean} True if the element is empty, otherwise false.
 * @throws {TypeError} If the parameter is neither an array nor an object.
 *
 * @example
 * const arrayIsEmpty = isEmpty([]); // true
 * const objectIsEmpty = isEmpty({}); // true
 *
 * const nonEmptyArray = isEmpty(['item']); // false
 * const nonEmptyObject = isEmpty({ key: 'value' }); // false
 */
export const isEmpty = (element: Array<String | Number> | Object): boolean => {
  if (Array.isArray(element)) {
    return element.length === 0;
  } else if (typeof element === 'object' && element !== null) {
    return Object.keys(element).length === 0;
  }

  return true;
};


/**
 * Extracts the first element from an array or returns null if the array is empty.
 *
 * @param {T[]} array - The array from which to extract the first element.
 * @returns {T | null} The first element of the array or null if the array is empty.
 */
export const firstOf = <T>(array: T[]): T | null => {
  return array.length > 0 ? array[0] : null;
};


/**
 * Sorts an array of objects by a specified key and direction.
 * 
 * @template T - The type of objects in the array.
 * @param {T[]} array - The array to be sorted.
 * @param {keyof T} key - The key to sort the objects by.
 * @param {boolean} asc - The direction to sort the objects in (true for ascending, false for descending).
 * @returns {T[]} - The sorted array.
 */
export const sortBy = <T>(array: T[], key: keyof T | null, asc: boolean | null): T[] => {
  if (key) {
    return array.sort((a: T, b: T) => {
      if (asc) {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      } else if (!asc) {
        if (a[key] > b[key]) {
          return -1;
        }
        if (a[key] < b[key]) {
          return 1;
        }
        return 0;
      } else {
        return 0;
      }
    });
  }
  return array;
};


/**
 * Returns an array of elements between the specified start and end indexes (inclusive).
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array from which to extract elements.
 * @param {number} startIndex - The starting index.
 * @param {number} endIndex - The ending index.
 * @returns {T[]} - The array of elements between the start and end indexes.
 */
export const extractBetween = <T>(array: T[], startIndex: number, endIndex: number): T[] => {
  return array.slice(startIndex, endIndex);
};
