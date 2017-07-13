import { PropertyValidatorContext } from "./property.validator.context";
import { PropertyValidator } from "./property.validator";

export class BooleanValidator<T> extends PropertyValidator<T> {

    constructor() {
        super("");
    }

    public isValid(context: PropertyValidatorContext<T>): boolean {
         return ['true', 'false', '1', '0'].indexOf(context.propertyValue) >= 0;
    }
}