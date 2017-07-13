"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const property_rule_1 = require("./property.rule");
const validation_result_1 = require("./results/validation.result");
const rule_builder_1 = require("./rule.builder");
class ValidatorContext {
    constructor(instanceToValidate) {
        this.instanceToValidate = instanceToValidate;
    }
}
exports.ValidatorContext = ValidatorContext;
class Validator {
    constructor(cascadeMode = enum_1.CascadeMode.StopOnFirstFailure) {
        this.cascadeMode = cascadeMode;
        this.rules = [];
    }
    async validateAsync(instanceToValidate) {
        let ctx = new ValidatorContext(instanceToValidate);
        ctx.cascade = this.cascadeMode;
        let validationFailures = [];
        for (let rule of this.rules) {
            let results = await rule.validateAsync(ctx);
            validationFailures = validationFailures.concat(results);
        }
        return new validation_result_1.ValidationResult(validationFailures);
    }
    addRule(valueToValidate) {
        let rule = new property_rule_1.PropertyRule(valueToValidate, this);
        this.rules.push(rule);
        let builder = new rule_builder_1.RuleBuilder(rule);
        return builder;
    }
}
exports.Validator = Validator;
