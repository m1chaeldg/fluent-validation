import { PropertyValidator } from './property.validator'
import { PropertyValidatorContext } from './property.validator.context'

export class PositiveValidator<T> extends PropertyValidator<T> {
    constructor() {
        super('{PropertyName} must be positive number.')
    }

    public isValid(context: PropertyValidatorContext<T>): Promise<boolean> {
        if (!context.propertyValue) {
            return Promise.resolve(false)
        }

        let value: number = <number>context.propertyValue

        return Promise.resolve(value > 0)
    }
}

export class NegativeValidator<T> extends PropertyValidator<T> {
    constructor() {
        super('{PropertyName} must be negative number.')
    }

    public isValid(context: PropertyValidatorContext<T>): Promise<boolean> {
        if (!context.propertyValue) {
            return Promise.resolve(false)
        }

        let value: number = <number>context.propertyValue

        return Promise.resolve(value < 0)
    }
}

export class RangeValidator<T> extends PropertyValidator<T> {
    constructor(public min: number, public max: number) {
        super('{PropertyName} required from range {Min} to {Max}')
    }

    public isValid(context: PropertyValidatorContext<T>): Promise<boolean> {
        if (!context.propertyValue) {
            return Promise.resolve(false)
        }

        let value: number = <number>context.propertyValue

        context.messageFormatter
            .appendArgument('Min', this.min)
            .appendArgument('Max', this.max)

        return Promise.resolve(value < this.max && value > this.min)
    }
}