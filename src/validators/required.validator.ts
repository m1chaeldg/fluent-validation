import { PropertyValidator } from './property.validator'
import { PropertyValidatorContext } from './property.validator.context'

export class RequiredPropertyValidator<T> extends PropertyValidator<T> {
    constructor() {
        super('field is required')
    }

    public isValid(context: PropertyValidatorContext<T>): Promise<boolean> {
        if (!context.propertyValue
            || this.isEmptyString(context.propertyValue)
            || this.isEmptyCollection(context.propertyValue)) {
            return Promise.resolve(false)
        }

        return Promise.resolve(true)
    }

    // tslint:disable-next-line
    private isEmptyCollection(propertyValue: any): boolean {

        if (propertyValue instanceof Array) {
            return propertyValue.length === 0
        }

        return false
    }

    // tslint:disable-next-line
    private isEmptyString(value: any): boolean {
        if (typeof (value) === 'string' || value instanceof String) {
            return value.trim().length === 0
        }
        return false
    }
}
