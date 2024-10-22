import {IModel, IModelBase} from "../domain/model/IModel";

export const cleanObject = (obj: Record<string, any>): Record<string, any> | null => {
    // If obj is not an object or is null, return it
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Create a new object to hold cleaned data
    const cleaned: any = Array.isArray(obj) ? [] : {};

    // Iterate over each key in the object
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = cleanObject(obj[key]); // Recursively clean the value

            // Only add non-null and non-empty values to the cleaned object
            if (value !== null) {
                cleaned[key] = value;
            }
        }
    }

    // If the cleaned object is empty, return null
    return Object.keys(cleaned).length === 0 ? null : cleaned;
}


export const deepEqual = (obj1: any, obj2: any) => {
    if (obj1 === obj2) return true;

    if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}

export function compareArrays<T extends IModel<T, any>>(arr: T[], arr2: T[]) {
    // Check if both arrays are null or undefined
    if (arr == null && arr2 == null) return true;
    // Check if one of the arrays is null or undefined
    if (arr == null || arr2 == null) return false;
    // Check if both are arrays and of the same length
    if (!Array.isArray(arr) || !Array.isArray(arr2) || arr.length !== arr2.length) {
        return false;
    }

    // Compare each element in both arrays
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].compare(arr2[i])) {
            return false; // Early return on first mismatch
        }
    }

    return true; // All elements matched
}

export function compareArraysBase<T extends IModelBase<T, any>>(arr: T[], arr2: T[]) {
    // Check if both arrays are null or undefined
    if (arr == null && arr2 == null) return true;
    // Check if one of the arrays is null or undefined
    if (arr == null || arr2 == null) return false;
    // Check if both are arrays and of the same length
    if (!Array.isArray(arr) || !Array.isArray(arr2) || arr.length !== arr2.length) {
        return false;
    }

    // Compare each element in both arrays
    for (let i = 0; i < arr.length; i++) {
        if (!(arr[i] as T).compare(arr2[i])) {
            return false; // Early return on first mismatch
        }
    }

    return true; // All elements matched
}