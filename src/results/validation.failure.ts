export class ValidationFailure {

    constructor(public propertyName: string, public errorMessage: string, public propertyValue: {}) {
    }

    public failed(): boolean {
        return this.errorMessage ? true : false
    }
}