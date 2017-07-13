"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_validator_1 = require("./property.validator");
class PredicateValidator extends property_validator_1.PropertyValidator {
    constructor(predicate) {
        super('');
        this.predicate = predicate;
    }
    async isValid(context) {
        let isValid = await this.predicate(context.instanceToValidate, context.propertyValue, context);
        return isValid;
    }
}
exports.PredicateValidator = PredicateValidator;
