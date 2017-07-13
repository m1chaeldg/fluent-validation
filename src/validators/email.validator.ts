import { PropertyValidatorContext } from './property.validator.context';
import { PropertyValidator } from "./property.validator";

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class EmailValidator<T> extends PropertyValidator<T> {

    constructor() {
        super("{PropertyName} is not a valid email address.");
    }

    public isValid(context: PropertyValidatorContext<T>): boolean {
        if (!context.propertyValue) {
            return true;
        }

        return emailPattern.test(<string>context.propertyValue);
    }
}