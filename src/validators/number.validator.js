"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_validator_1 = require("./property.validator");
class PositiveValidator extends property_validator_1.PropertyValidator {
    constructor() {
        super('{PropertyName} must be positive number.');
    }
    isValid(context) {
        if (!context.propertyValue) {
            return Promise.resolve(false);
        }
        let value = context.propertyValue;
        return Promise.resolve(value > 0);
    }
}
exports.PositiveValidator = PositiveValidator;
class NegativeValidator extends property_validator_1.PropertyValidator {
    constructor() {
        super('{PropertyName} must be negative number.');
    }
    isValid(context) {
        if (!context.propertyValue) {
            return Promise.resolve(false);
        }
        let value = context.propertyValue;
        return Promise.resolve(value < 0);
    }
}
exports.NegativeValidator = NegativeValidator;
class RangeValidator extends property_validator_1.PropertyValidator {
    constructor(min, max) {
        super('{PropertyName} required from range {Min} to {Max}');
        this.min = min;
        this.max = max;
    }
    isValid(context) {
        if (!context.propertyValue) {
            return Promise.resolve(false);
        }
        let value = context.propertyValue;
        context.messageFormatter
            .appendArgument('Min', this.min)
            .appendArgument('Max', this.max);
        return Promise.resolve(value < this.max && value > this.min);
    }
}
exports.RangeValidator = RangeValidator;
