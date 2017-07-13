export class ValidationFailure {

    constructor(public propertyName: string, public errorMessage: string, public propertyValue: any) {
    }

    public failed(): boolean {
        return this.errorMessage ? true : false;
    }
}