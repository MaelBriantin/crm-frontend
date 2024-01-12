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