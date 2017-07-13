"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_validator_1 = require("./property.validator");
class IncludesValidator extends property_validator_1.PropertyValidator {
    constructor(stringLiteral) {
        super('{PropertyName} does not include {StringLiteral}');
        this.stringLiteral = stringLiteral;
    }
    isValid(context) {
        let value = context.propertyValue;
        for (let i = 0, len = value.length; i < len; i++) {
            if (this.stringLiteral.includes(value[i])) {
                return Promise.resolve(true);
            }
        }
        context.messageFormatter
            .appendArgument('StringLiteral', this.stringLiteral);
        return Promise.resolve(false);
    }
}
exports.IncludesValidator = IncludesValidator;
