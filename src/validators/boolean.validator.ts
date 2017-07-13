import { PropertyValidatorContext } from './property.validator.context'
import { PropertyValidator } from './property.validator'

export class BooleanValidator<T> extends PropertyValidator<T> {

    constructor() {
        super('')
    }

    public isValid(context: PropertyValidatorContext<T>): Promise<boolean> {
        let result: boolean = ['true', 'false', '1', '0'].indexOf(context.propertyValue) >= 0
        return Promise.resolve(result)
    }
}