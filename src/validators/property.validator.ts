import { ValidationFailure } from '../results/validation.failure'
import { StaticStringSource, StringSource } from '../string.source'
import { PropertyValidatorContext } from './property.validator.context'

export abstract class PropertyValidator<T> {
    public errorSource: StringSource

    protected onValidateAsync: (context: PropertyValidatorContext<T>) => Promise<ValidationFailure[]>

    public abstract isValid(context: PropertyValidatorContext<T>): Promise<boolean>

    constructor(errorMessage: string) {
        this.onValidateAsync = this.privateValidateAsync

        this.errorSource = new StaticStringSource(errorMessage)
    }

    public validateAsync(context: PropertyValidatorContext<T>): Promise<ValidationFailure[]> {
        return this.onValidateAsync(context)
    }

    private async privateValidateAsync(context: PropertyValidatorContext<T>): Promise<ValidationFailure[]> {
        let isValid: boolean = await this.isValid(context)
        if (!isValid) {
            let template: string = await this.errorSource.getStringAsync()
            context.messageFormatter
                .appendPropertyName(context.propertyName)
                .appendPropertyValue(context.propertyValue)

            let errorMessage: string = context.messageFormatter.buildMessage(template)
            let result: ValidationFailure[] = [new ValidationFailure(context.propertyName, errorMessage, context.propertyValue)]

            return Promise.resolve(result)
        }
        return Promise.resolve([])
    }
}