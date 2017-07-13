import { PropertyValidatorContext } from "./property.validator.context";
import { PropertyValidator } from "./property.validator";

export interface Predicate<T>{
    (instanceToValidate: T, propertyValue: any, propertyValidatorContext: PropertyValidatorContext<T>) : Promise<boolean>
}

export class PredicateValidator<T> extends PropertyValidator<T> {


    constructor(private predicate: Predicate<T>) {
        super("");
    }

    public isValid(context: PropertyValidatorContext<T>): boolean {
        if (!this.predicate(context.instanceToValidate, context.propertyValue, context)) {
            return false;
        }

        return true;
    }
}