import { PropertyValidator } from './property.validator'
import { PropertyValidatorContext } from './property.validator.context'

export type Predicate<T> = (instanceToValidate: T, propertyValue: {}, propertyValidatorContext: PropertyValidatorContext<T>) => Promise<boolean>

export class PredicateValidator<T> extends PropertyValidator<T> {

    constructor(private predicate: Predicate<T>) {
        super('')
    }

    public async isValid(context: PropertyValidatorContext<T>): Promise<boolean> {

        let isValid: boolean = await this.predicate(context.instanceToValidate, context.propertyValue, context)

        return isValid
    }
}