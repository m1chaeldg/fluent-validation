"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageFormatter {
    constructor() {
        this.propertyName = 'PropertyName';
        this.propertyValue = 'PropertyValue';
        this.placeholderValues = {};
    }
    appendArgument(name, value) {
        this.placeholderValues[name] = value;
        return this;
    }
    appendPropertyName(name) {
        return this.appendArgument(this.propertyName, name);
    }
    appendPropertyValue(value) {
        return this.appendArgument(this.propertyValue, value);
    }
    buildMessage(messageTemplate) {
        let result = messageTemplate;
        for (let key in this.placeholderValues) {
            if (this.placeholderValues.hasOwnProperty(key)) {
                let placeHolder = this.getPlaceholder(key);
                let value = this.placeholderValues[key];
                result = result.replace(placeHolder, value);
            }
        }
        return result;
    }
    getPlaceholder(key) {
        switch (key) {
            case this.propertyName:
                return '{' + this.propertyName + '}';
            case this.propertyValue:
                return '{' + this.propertyValue + '}';
            default:
                return '{' + key + '}';
        }
    }
}
class PropertyValidatorContext {
    constructor() {
        this.messageFormatter = new MessageFormatter();
    }
}
exports.PropertyValidatorContext = PropertyValidatorContext;
