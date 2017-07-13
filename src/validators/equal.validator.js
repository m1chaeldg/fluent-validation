"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_validator_1 = require("./property.validator");
class EqualValidator extends property_validator_1.PropertyValidator {
    constructor(valueToCompare) {
        super('');
        this.valueToCompare = valueToCompare;
    }
    isValid(context) {
        return Promise.resolve(context.propertyValue === this.valueToCompare);
    }
}
exports.EqualValidator = EqualValidator;
