"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_validator_1 = require("./property.validator");
class DelegatingValidator extends property_validator_1.PropertyValidator {
    constructor(condition, innerValidator) {
        super('');
        this.condition = condition;
        this.innerValidator = innerValidator;
        this.onValidateAsync = this._delegatingValidateAsync;
    }
    async _delegatingValidateAsync(context) {
        let shouldValidate = await this.condition(context.instanceToValidate);
        if (shouldValidate) {
            return await this.innerValidator.validateAsync(context);
        }
        return Promise.resolve([]);
    }
    isValid(context) {
        return Promise.resolve(true);
    }
}
exports.DelegatingValidator = DelegatingValidator;
