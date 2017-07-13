"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationResult {
    constructor(errors) {
        this.errors = errors;
    }
    isValid() {
        return this.errors.length === 0;
    }
}
exports.ValidationResult = ValidationResult;
