import { PropertyValidatorContext } from './property.validator.context'
import { PropertyValidator } from './property.validator'


export class RequiredPropertyValidator<T> extends PropertyValidator<T> {
    constructor() {
        super('field is required')
    }

    public isValid(context: PropertyValidatorContext<T>): boolean {
        if (!context.propertyValue
            || this.isEmptyString(context.propertyValue)
            || this.isEmptyCollection(context.propertyValue)) {
            return false;
        }

        return true;
    }

    private isEmptyCollection(propertyValue: any): boolean {
        if (propertyValue instanceof Array){
            return propertyValue.length == 0
        }
        return false;
    }

    private isEmptyString(value: any): boolean {
        if (typeof (value) == 'string' || value instanceof String) {
            return value.length == 0;
        }
        return false;
    }
}