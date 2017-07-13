import { ValidationFailure } from '../results/validation.failure'
import { PropertyValidator } from './property.validator'
import { PropertyValidatorContext } from './property.validator.context'

export class DelegatingValidator<T> extends PropertyValidator<T> {
    constructor(private condition: (instance: T) => Promise<boolean>, private innerValidator: PropertyValidator<T>) {
        super('')

        this.onValidateAsync = this._delegatingValidateAsync
    }

    private async _delegatingValidateAsync(context: PropertyValidatorContext<T>): Promise<ValidationFailure[]> {

        let shouldValidate: boolean = await this.condition(context.instanceToValidate)
        if (shouldValidate) {
            return await this.innerValidator.validateAsync(context)
        }

        return Promise.resolve([])
    }

    /**
     * this is not being use
     *
     * @param {PropertyValidatorContext<T>} context
     * @returns {boolean}
     *
     * @memberof DelegatingValidator
     */
    public isValid(context: PropertyValidatorContext<T>): Promise<boolean> {
        return Promise.resolve(true)
    }

}