"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_validator_1 = require("./property.validator");
class RequiredPropertyValidator extends property_validator_1.PropertyValidator {
    constructor() {
        super('field is required');
    }
    isValid(context) {
        if (!context.propertyValue
            || this.isEmptyString(context.propertyValue)
            || this.isEmptyCollection(context.propertyValue)) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }
    isEmptyCollection(propertyValue) {
        if (propertyValue instanceof Array) {
            return propertyValue.length === 0;
        }
        return false;
    }
    isEmptyString(value) {
        if (typeof (value) === 'string' || value instanceof String) {
            return value.trim().length === 0;
        }
        return false;
    }
}
exports.RequiredPropertyValidator = RequiredPropertyValidator;
