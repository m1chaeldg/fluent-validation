import { ValidatorContext } from "../validator";

class MessageFormatter {
    placeholderValues: {};

    /**
     * Default Property Name placeholder.
     * 
     * 
     * @memberof MessageFormatter
     */
    public propertyName = "PropertyName"
    /**
     * Default Property Value placeholder.
     * 
     * 
     * @memberof MessageFormatter
     */
    public propertyValue = "PropertyValue"

    /**
     *  Adds a value for a validation message placeholder.
     * 
     * @param {string} name 
     * @param {*} value 
     * @returns {MessageFormatter} 
     * 
     * @memberof MessageFormatter
     */
    public appendArgument(name: string, value: any): MessageFormatter {
        this.placeholderValues[name] = value;
        return this;
    }

    /**
     *  Appends a property name to the message.
     * 
     * @param {string} name 
     * @returns {MessageFormatter} 
     * 
     * @memberof MessageFormatter
     */

    public AppendPropertyName(name: string): MessageFormatter {
        return this.appendArgument(this.propertyName, name);
    }

    /**
     * Appends a property value to the message.
     * 
     * @param {*} value 
     * @returns {MessageFormatter} 
     * 
     * @memberof MessageFormatter
     */
    public AppendPropertyValue(value: any): MessageFormatter {
        return this.appendArgument(this.propertyValue, value);
    }

    public buildMessage(messageTemplate: string): string {

        let result = messageTemplate;
        for (let key in this.placeholderValues) {
            let placeHolder = this.getPlaceholder(key)
            let value = this.placeholderValues[key]

            result = result.replace(placeHolder, value)
        }

        return result;
    }

    private getPlaceholder(key: string): string {

        switch (key) {
            case this.propertyName:
                return "{" + this.propertyName + "}";
            case this.propertyValue:
                return "{" + this.propertyValue + "}";
            default:
                return "{" + key + "}";
        }
    }
}

export class PropertyValidatorContext<T> {
    propertyValue: any;
    propertyName: string;
    instanceToValidate: T;
    validatorContext: ValidatorContext<T>
    messageFormatter: MessageFormatter

    constructor() {
        this.messageFormatter = new MessageFormatter();
    }
}

