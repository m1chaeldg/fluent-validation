"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const delegating_validator_1 = require("./validators/delegating.validator");
const property_validator_context_1 = require("./validators/property.validator.context");
class PropertyRule {
    constructor(propertyValue, validator) {
        this.propertyValue = propertyValue;
        this.validator = validator;
        this.validators = [];
    }
    async validateAsync(validatorContext) {
        let validationResults = [];
        let ctx = new property_validator_context_1.PropertyValidatorContext();
        ctx.propertyName = this.propertyName;
        ctx.propertyValue = this.propertyValue;
        ctx.validatorContext = validatorContext;
        ctx.instanceToValidate = validatorContext.instanceToValidate;
        for (let validator of this.validators) {
            let results = await validator.validateAsync(ctx);
            let hasFailure = false;
            results.forEach(result => {
                validationResults.push(result);
                hasFailure = true;
            });
            if (hasFailure && validatorContext.cascade === enum_1.CascadeMode.StopOnFirstFailure) {
                break;
            }
        }
        return validationResults;
    }
    addValidator(validator) {
        this.currentValidator = validator;
        this.validators.push(validator);
    }
    applyCondition(condition, applyConditionTo) {
        if (applyConditionTo === enum_1.ApplyConditionTo.AllValidators) {
            for (let validator of this.validators) {
                let wrappedValidator = new delegating_validator_1.DelegatingValidator(condition, validator);
                this.replaceValidator(this.currentValidator, wrappedValidator);
            }
        }
        else {
            let wrappedValidator = new delegating_validator_1.DelegatingValidator(condition, this.currentValidator);
            this.replaceValidator(this.currentValidator, wrappedValidator);
        }
    }
    replaceValidator(original, newValidator) {
        let index = this.validators.indexOf(original);
        if (index > -1) {
            this.validators[index] = newValidator;
            this.currentValidator = newValidator;
        }
    }
}
exports.PropertyRule = PropertyRule;
