import { PropertyValidator } from './property.validator'
import { PropertyValidatorContext } from './property.validator.context'

// tslint:disable-next-line
const emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export class EmailValidator<T> extends PropertyValidator<T> {

    constructor() {
        super('{PropertyName} is not a valid email address.')
    }

    public isValid(context: PropertyValidatorContext<T>): Promise<boolean> {
        if (!context.propertyValue) {
            return Promise.resolve(true)
        }

        return Promise.resolve(emailPattern.test(<string>context.propertyValue))
    }
}