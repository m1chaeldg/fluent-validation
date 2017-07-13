import { ValidationFailure } from "./validation.failure";

export class ValidationResult {

    constructor(public errors: ValidationFailure[]) {
    }

    /**
     * Whether validation succeeded
     */
    public isValid(): boolean {
        return this.errors.length === 0;
    }
}