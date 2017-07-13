"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_failure_1 = require("../results/validation.failure");
const string_source_1 = require("../string.source");
class PropertyValidator {
    constructor(errorMessage) {
        this.onValidateAsync = this.privateValidateAsync;
        this.errorSource = new string_source_1.StaticStringSource(errorMessage);
    }
    validateAsync(context) {
        return this.onValidateAsync(context);
    }
    async privateValidateAsync(context) {
        let isValid = await this.isValid(context);
        if (!isValid) {
            let template = await this.errorSource.getStringAsync();
            context.messageFormatter
                .appendPropertyName(context.propertyName)
                .appendPropertyValue(context.propertyValue);
            let errorMessage = context.messageFormatter.buildMessage(template);
            let result = [new validation_failure_1.ValidationFailure(context.propertyName, errorMessage, context.propertyValue)];
            return Promise.resolve(result);
        }
        return Promise.resolve([]);
    }
}
exports.PropertyValidator = PropertyValidator;
