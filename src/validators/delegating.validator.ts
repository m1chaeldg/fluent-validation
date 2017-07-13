import { PropertyValidatorContext } from "./property.validator.context";
import { PropertyValidator } from "./property.validator";
import { ValidationFailure } from "../results/validation.failure";


export class DelegatingValidator<T> extends PropertyValidator<T> {
    constructor(private condition: (instance: T) => Promise<boolean>, private innerValidator: PropertyValidator<T>) {
        super("");

        this.onValidateAsync = this._delegatingValidateAsync;
    }


    private async _delegatingValidateAsync(context: PropertyValidatorContext<T>): Promise<ValidationFailure[]> {

        let shouldValidate:boolean = await this.condition(context.instanceToValidate);
        if (shouldValidate) {
            return await this.innerValidator.validateAsync(context);
        }

        return Promise.resolve(new Array<ValidationFailure>());
    }

    public isValid(context: PropertyValidatorContext<T>): boolean {
        return true;
    }

}