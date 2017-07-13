"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_validator_1 = require("./property.validator");
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class EmailValidator extends property_validator_1.PropertyValidator {
    constructor() {
        super('{PropertyName} is not a valid email address.');
    }
    isValid(context) {
        if (!context.propertyValue) {
            return Promise.resolve(true);
        }
        return Promise.resolve(emailPattern.test(context.propertyValue));
    }
}
exports.EmailValidator = EmailValidator;
