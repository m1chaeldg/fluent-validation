"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_validator_1 = require("./property.validator");
class BooleanValidator extends property_validator_1.PropertyValidator {
    constructor() {
        super('');
    }
    isValid(context) {
        let result = ['true', 'false', '1', '0'].indexOf(context.propertyValue) >= 0;
        return Promise.resolve(result);
    }
}
exports.BooleanValidator = BooleanValidator;
