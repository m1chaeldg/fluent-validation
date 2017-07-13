"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("./enum");
const string_source_1 = require("./string.source");
const email_validator_1 = require("./validators/email.validator");
const equal_validator_1 = require("./validators/equal.validator");
const includes_validator_1 = require("./validators/includes.validator");
const length_validator_1 = require("./validators/length.validator");
const number_validator_1 = require("./validators/number.validator");
const predicate_validator_1 = require("./validators/predicate.validator");
const required_validator_1 = require("./validators/required.validator");
class RuleBuilder {
    constructor(rule) {
        this.rule = rule;
    }
    validate(valueToValidate) {
        this.rule.propertyValue = valueToValidate;
        return this;
    }
    withParameterName(propertyName) {
        this.rule.propertyName = propertyName;
        return this;
    }
    withMessage(errorMessage) {
        this.rule.currentValidator.errorSource = new string_source_1.StaticStringSource(errorMessage);
        return this;
    }
    withLazyLoadMessage(fnLoad, resourceName) {
        this.rule.currentValidator.errorSource = new string_source_1.LazyStringSource(fnLoad, resourceName);
        return this;
    }
    required() {
        this.rule.addValidator(new required_validator_1.RequiredPropertyValidator());
        return this;
    }
    addRule(valueToValidate) {
        return this.rule.validator.addRule(valueToValidate);
    }
    addValidator(validator) {
        this.rule.addValidator(validator);
        return this;
    }
    length(min, max) {
        this.rule.addValidator(new length_validator_1.LengthValidator(min, max));
        return this;
    }
    emailAddress() {
        this.rule.addValidator(new email_validator_1.EmailValidator());
        return this;
    }
    equal(objectToCompare) {
        this.rule.addValidator(new equal_validator_1.EqualValidator(objectToCompare));
        return this;
    }
    when(condition, applyConditionTo = enum_1.ApplyConditionTo.AllValidators) {
        this.rule.applyCondition(condition, applyConditionTo);
        return this;
    }
    unless(condition, applyConditionTo = enum_1.ApplyConditionTo.AllValidators) {
        let unlessCondition = async (x) => {
            return Promise.resolve(!(await condition(x)));
        };
        this.rule.applyCondition(unlessCondition, applyConditionTo);
        return this;
    }
    must(condition) {
        this.rule.addValidator(new predicate_validator_1.PredicateValidator(condition));
        return this;
    }
    includes(stringLieteral) {
        this.rule.addValidator(new includes_validator_1.IncludesValidator(stringLieteral));
        return this;
    }
    range(min, max) {
        this.rule.addValidator(new number_validator_1.RangeValidator(min, max));
        return this;
    }
    negative() {
        this.rule.addValidator(new number_validator_1.NegativeValidator());
        return this;
    }
    positive() {
        this.rule.addValidator(new number_validator_1.PositiveValidator());
        return this;
    }
}
exports.RuleBuilder = RuleBuilder;
