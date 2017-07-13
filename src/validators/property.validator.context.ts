import { ValidatorContext } from '../validator'

class MessageFormatter {
    private placeholderValues: {}

    /**
     * Default Property Name placeholder.
     *
     *
     * @memberof MessageFormatter
     */
    public propertyName: string = 'PropertyName'
    /**
     * Default Property Value placeholder.
     *
     *
     * @memberof MessageFormatter
     */
    public propertyValue: string = 'PropertyValue'

    constructor() {
        this.placeholderValues = {}
    }
    /**
     *  Adds a value for a validation message placeholder.
     *
     * @param {string} name
     * @param {*} value
     * @returns {MessageFormatter}
     *
     * @memberof MessageFormatter
     */
    public appendArgument(name: string, value: {}): MessageFormatter {
        this.placeholderValues[name] = value
        return this
    }

    /**
     *  Appends a property name to the message.
     *
     * @param {string} name
     * @returns {MessageFormatter}
     *
     * @memberof MessageFormatter
     */

    public appendPropertyName(name: string): MessageFormatter {
        return this.appendArgument(this.propertyName, name)
    }

    /**
     * Appends a property value to the message.
     *
     * @param {*} value
     * @returns {MessageFormatter}
     *
     * @memberof MessageFormatter
     */
    public appendPropertyValue(value: {}): MessageFormatter {
        return this.appendArgument(this.propertyValue, value)
    }

    public buildMessage(messageTemplate: string): string {

        let result: string = messageTemplate
        for (let key in this.placeholderValues) {
            if (this.placeholderValues.hasOwnProperty(key)) {
                let placeHolder: string = this.getPlaceholder(key)
                // tslint:disable-next-line
                let value: any = this.placeholderValues[key]

                result = result.replace(placeHolder, value)
            }

        }

        return result
    }

    private getPlaceholder(key: string): string {

        switch (key) {
            case this.propertyName:
                return '{' + this.propertyName + '}'
            case this.propertyValue:
                return '{' + this.propertyValue + '}'
            default:
                return '{' + key + '}'
        }
    }
}

export class PropertyValidatorContext<T> {
    // tslint:disable-next-line
    public propertyValue: any
    public propertyName: string
    public instanceToValidate: T
    public validatorContext: ValidatorContext<T>
    public messageFormatter: MessageFormatter

    constructor() {
        this.messageFormatter = new MessageFormatter()
    }
}
