import { ValidationFailure } from "../results/validation.failure";
import { PropertyValidatorContext } from './property.validator.context'
import { StringSource, StaticStringSource } from '../string.source'


export abstract class PropertyValidator<T> {
    public errorSource: StringSource

    protected onValidateAsync: (context: PropertyValidatorContext<T>) => Promise<ValidationFailure[]>;

    constructor(errorMessage: string) {
        this.onValidateAsync = this._validateAsync;

        this.errorSource = new StaticStringSource(errorMessage)
    }

    public validateAsync(context: PropertyValidatorContext<T>): Promise<ValidationFailure[]> {
        return this.onValidateAsync(context);
    }

    private async _validateAsync(context: PropertyValidatorContext<T>): Promise<ValidationFailure[]> {
        if (!this.isValid(context)) {
            let template = await this.errorSource.getStringAsync()
            let errorMessage = context.messageFormatter.buildMessage(template)
            let result = [new ValidationFailure(context.propertyName, errorMessage, context.propertyValue)];

            return Promise.resolve(result);
        }
        return Promise.resolve(new Array<ValidationFailure>());
    }

    public abstract isValid(context: PropertyValidatorContext<T>): boolean;
}