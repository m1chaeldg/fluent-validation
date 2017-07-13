import { PropertyValidator } from './property.validator'
import { PropertyValidatorContext } from './property.validator.context'

export class EqualValidator<T> extends PropertyValidator<T> {

    constructor(public valueToCompare: {}) {
        super('')
    }

    public isValid(context: PropertyValidatorContext<T>): Promise<boolean> {
        return Promise.resolve(context.propertyValue === this.valueToCompare)
    }
}