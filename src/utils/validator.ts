import mongoose from 'mongoose';
import { Request } from 'express';

/**
 * Validates that a required field has a defined and non-null value.
 * Throws an error if the field is missing or its value is undefined or null.
 *
 * @function
 * @param {Object} data - The field data object to validate.
 * @param {string} data.fieldName - The name of the field being validated.
 * @param {string} data.value - The value of the field being validated.
 * @throws {Error} - Throws an error if the field's value is undefined or null, specifying the field name.
 * @returns {boolean} - Returns `true` if the field's value is defined and not null.
 */

type Data = Request['body'];

export const validateBody = (requiredFields: string[], data: Data) => {
    if (Object.keys(data).length !== requiredFields.length) {
        return false;
    }

    for (const field of Object.keys(data)) {
        if (!requiredFields.includes(field)) {
            return false;
        }

        if (!validateRequiredFields(field, data[field] as string)) {
            return false;
        }
    }

    return true;
};

export const validateRequiredFields = (fieldName: string, value: string) => {
    if (!value) {
        throw new Error(
            `All fields are required: ${fieldName} is undefined or null`
        );
    }
    return true;
};

/**
 * Validates that a given field's value is a string containing only alphanumeric characters,
 * spaces, exclamation marks, or question marks. Throws an error if the field's value contains
 * non-alphanumeric characters or if it is not a string.
 *
 * @function
 * @param {Object} data - The field data object to validate.
 * @param {string} data.fieldName - The name of the field being validated.
 * @param {*} data.value - The value of the field being validated.
 * @throws {Error} - Throws an error if the field's value is not a string or contains invalid characters.
 * @returns {boolean} - Returns `true` if the field's value is a valid alphanumeric string.
 */
export const validateString = (fieldName: string, value: string) => {
    const isAlphanumeric = (str: string) => /^[a-zA-Z0-9\s!?]+$/.test(str);
    // title
    if (typeof value !== 'string' || !isAlphanumeric(value)) {
        throw new Error(
            `${fieldName} must be a string with no weird characters !`
        );
    }
    return true;
};

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateName = (str: string) => {
    // only letters and spaces and at least 2 characters
    const stringRegex = /^[a-zA-Z\s]+$/;
    return stringRegex.test(str);
};

export const validateObjectId = (id: string) => {
    try {
        return mongoose.Types.ObjectId.isValid(id);
    } catch (error) {
        return false;
    }
};
