import { PropertyValidator } from './property.validator'
import { PropertyValidatorContext } from './property.validator.context'

export class IncludesValidator<T> extends PropertyValidator<T> {
    constructor(public stringLiteral: string) {
        super('{PropertyName} does not include {StringLiteral}')
    }

    public isValid(context: PropertyValidatorContext<T>): Promise<boolean> {

        let value: string = <string>context.propertyValue

        // tslint:disable-next-line
        for (let i: number = 0, len: number = value.length; i < len; i++) {
            if (this.stringLiteral.includes(value[i])) {
                return Promise.resolve(true)
            }
        }

        context.messageFormatter
            .appendArgument('StringLiteral', this.stringLiteral)

        return Promise.resolve(false)
    }
}