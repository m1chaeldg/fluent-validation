"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_validator_1 = require("./property.validator");
class LengthValidator extends property_validator_1.PropertyValidator {
    constructor(minLength, maxLength) {
        super('{PropertyName} must be between {MinLength} and {MaxLength} characters. You entered {TotalLength} characters.');
        this.minLength = minLength;
        this.maxLength = maxLength;
        if (maxLength !== -1 && maxLength < minLength) {
            throw new Error('maxLength should be larger than minLength.');
        }
    }
    isValid(context) {
        if (!context.propertyValue) {
            return Promise.resolve(true);
        }
        let min = this.minLength;
        let max = this.maxLength;
        let length = context.propertyValue.length;
        if (length < min || (length > max && max !== -1)) {
            context.messageFormatter
                .appendArgument('MinLength', min)
                .appendArgument('MaxLength', max)
                .appendArgument('TotalLength', length);
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }
}
exports.LengthValidator = LengthValidator;
