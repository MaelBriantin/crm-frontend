import { ReactNode } from "react";

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
export const isEmpty = (element: Array<string | number> | object | string): boolean => {
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
export const sortBy = <T>(array: T[], key: keyof T | null, asc: boolean | null = true): T[] => {
  if (key) {
    return array.sort((a: T, b: T) => {
      const aValue = a[key];
      const bValue = b[key];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return asc ? (aValue as string).localeCompare(bValue as string) : (bValue as string).localeCompare(aValue as string);
      }
      if (asc) {
        if (aValue < bValue) {
          return -1;
        }
        if (aValue > bValue) {
          return 1;
        }
        return 0;
      } else if (!asc) {
        if (aValue > bValue) {
          return -1;
        }
        if (aValue < bValue) {
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

/**
 * Returns the first X elements of an array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array from which to extract elements.
 * @param {number} count - The number of elements to return.
 * @returns {T[]} - The array of the first X elements.
 */
export const limit = <T>(array: T[], count: number): T[] => {
  return array.slice(0, count);
};

/**
 * Exclude elements from an array based on given values.
 *
 * @template T - The type of elements in the array.
 * @param {T | T[]} elements - The element or array of elements to exclude from the array.
 * @param {T[]} from - The array from which to exclude the elements.
 * @returns {T[]} - The array without the excluded elements.
 */
export const filterOut = <T>(elements: T | T[], from: T[]): T[] => {
  const elementsArray = Array.isArray(elements) ? elements : [elements];
  return from.filter((element) => !elementsArray.includes(element));
};

/**
 * Exclude keys from an object based on given keys.
 *
 * @template T - The type of the object.
 * @param {keyof T | (keyof T)[]} keys - The key or array of keys to exclude from the object.
 * @param {T} from - The object from which to exclude the keys.
 * @returns {Partial<T>} - The object without the excluded keys.
 */
export const filterOutKeys = <T extends object>(keys: keyof T | (keyof T)[], from: T): Partial<T> => {
  const keysArray = Array.isArray(keys) ? keys : [keys];
  const result: Partial<T> = {};
  for (const key in from) {
    if (!keysArray.includes(key as keyof T)) {
      result[key as keyof T] = from[key as keyof T];
    }
  }
  return result;
};


/**
 * Creates a deep copy of the given object.
 * 
 * @param value - The object to be deep copied.
 * @returns A deep copy of the given object.
 */
export const deepCopy = (value: object) => {
  return JSON.parse(JSON.stringify(value));
}


/**
 * Removes specified keys from an object or an array of objects.
 *
 * @param {object | object[]} obj - The object or array of objects from which to remove keys.
 * @param {string[]} keysToRemove - The array of keys to remove.
 * @returns {object | object[]} - The object or array of objects without the specified keys.
 */
export const removeKeys = (obj: object | object[], keysToRemove: string[]): object | object[] => {
  if (Array.isArray(obj)) {
    return obj.map(item => removeKeys(item, keysToRemove));
  } else {
    const newObj: { [key: string]: unknown } = { ...obj };
    keysToRemove.forEach(key => {
      delete newObj[key];
    });
    return newObj;
  }
};



/**
 * Deeply compares two objects and checks if they are equal.
 * @param obj1 - The first object to compare.
 * @param obj2 - The second object to compare.
 * @param keys - Optional array of keys to compare. If provided, only the specified keys will be compared.
 * @returns True if the objects are equal, false otherwise.
 */
export const deepCompare = <T extends object>(obj1: T, obj2: T, keys?: string[]): boolean => {
  if (keys) {
    for (const key of keys) {
      const value1 = obj1[key as keyof typeof obj1];
      const value2 = obj2[key as keyof typeof obj2];

      if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null) {
        if (!deepCompare(value1, value2)) {
          return false;
        }
      } else if (JSON.stringify(value1) !== JSON.stringify(value2)) {
        return false;
      }
    }
  } else {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const value1 = obj1[key as keyof typeof obj1];
      const value2 = obj2[key as keyof typeof obj2];

      if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null) {
        if (!deepCompare(value1, value2)) {
          return false;
        }
      } else if (JSON.stringify(value1) !== JSON.stringify(value2)) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Retrieves the value of a nested property from an object.
 *
 * @template T - The type of the object.
 * @template R - The type of the returned value.
 * @param obj - The object to retrieve the value from.
 * @param key - The key of the nested property.
 * @returns The value of the nested property, or undefined if it doesn't exist.
 */
export const getValue = <T extends object, R = ReactNode>(obj: T, key: string): R | undefined => {
  const keys = key.split('.');
  let value: unknown = obj;

  for (const k of keys) {
    if (value && typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, k)) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }

  if (typeof value === 'object' && value !== null) {
    if ((value as object) instanceof Date) {
      return (value as unknown as Date).toISOString() as R;
    } else {
      return JSON.stringify(value) as R;
    }
  }
  return value as R;
}

export const validateEmail = (email: string) => {
  //const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
