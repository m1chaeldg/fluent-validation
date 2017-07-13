import { PropertyValidatorContext } from "./property.validator.context";
import { PropertyValidator } from "./property.validator";

export class EqualValidator<T> extends PropertyValidator<T> {

    constructor(public valueToCompare:any) {
        super("");
    }

    public isValid(context: PropertyValidatorContext<T>): boolean {
        return context.propertyValue === this.valueToCompare;
    }
}