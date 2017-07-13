"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationFailure {
    constructor(propertyName, errorMessage, propertyValue) {
        this.propertyName = propertyName;
        this.errorMessage = errorMessage;
        this.propertyValue = propertyValue;
    }
    failed() {
        return this.errorMessage ? true : false;
    }
}
exports.ValidationFailure = ValidationFailure;
