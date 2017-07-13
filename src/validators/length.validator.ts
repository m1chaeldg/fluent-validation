import { PropertyValidator } from './property.validator'
import { PropertyValidatorContext } from './property.validator.context'

export class LengthValidator<T> extends PropertyValidator<T> {
    constructor(public minLength: number, public maxLength: number) {
        super('{PropertyName} must be between {MinLength} and {MaxLength} characters. You entered {TotalLength} characters.')

        if (maxLength !== -1 && maxLength < minLength) {
            throw new Error('maxLength should be larger than minLength.')
        }
    }

    public isValid(context: PropertyValidatorContext<T>): Promise<boolean> {
        if (!context.propertyValue) {
            return Promise.resolve(true)
        }

        let min: number = this.minLength
        let max: number = this.maxLength

        let length: number = context.propertyValue.length

        if (length < min || (length > max && max !== -1)) {
            context.messageFormatter
                .appendArgument('MinLength', min)
                .appendArgument('MaxLength', max)
                .appendArgument('TotalLength', length)

            return Promise.resolve(false)
        }

        return Promise.resolve(true)
    }

}