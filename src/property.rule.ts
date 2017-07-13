import { PropertyValidator } from './validators/property.validator'
import { PropertyValidatorContext } from './validators/property.validator.context'
import { Validator, ValidatorContext } from './validator'
import { ValidationFailure } from './results/validation.failure'
import { CascadeMode, ApplyConditionTo } from './enum'
import { DelegatingValidator } from "./validators/delegating.validator";

export class PropertyRule<TInstance> {
    validators: PropertyValidator<TInstance>[] = []
    public currentValidator: PropertyValidator<TInstance>
    public propertyName: string

    constructor(public propertyValue: any, public validator: Validator<TInstance>) {

    }

    public async validateAsync(validatorContext: ValidatorContext<TInstance>): Promise<ValidationFailure[]> {
        let validationResults: ValidationFailure[] = [];

        let ctx = new PropertyValidatorContext<TInstance>()
        ctx.propertyName = this.propertyName
        ctx.propertyValue = this.propertyValue
        ctx.validatorContext = validatorContext
        ctx.instanceToValidate = validatorContext.instanceToValidate;

        for (let validator of this.validators) {

            let results = await validator.validateAsync(ctx)
            let hasFailure = false;

            results.forEach(result => {
                validationResults.push(result);
                hasFailure = true;
            });

            if (hasFailure && validatorContext.cascade == CascadeMode.StopOnFirstFailure) {
                break;
            }
        }

        return validationResults
    }

    public addValidator(validator: PropertyValidator<TInstance>) {
        this.currentValidator = validator;
        this.validators.push(validator);
    }

    public applyCondition(condition: (instance: TInstance) => Promise<boolean>, applyConditionTo: ApplyConditionTo) {

        if (applyConditionTo == ApplyConditionTo.AllValidators) {
            for (let validator of this.validators) {
                var wrappedValidator = new DelegatingValidator(condition, validator);
                this.replaceValidator(this.currentValidator, wrappedValidator);
            }

        } else {
            var wrappedValidator = new DelegatingValidator(condition, this.currentValidator);
            this.replaceValidator(this.currentValidator, wrappedValidator);
        }

    }

    public replaceValidator(original: PropertyValidator<TInstance>, newValidator: PropertyValidator<TInstance>) {
        var index = this.validators.indexOf(original);

        if (index > -1) {
            this.validators[index] = newValidator;
            this.currentValidator = newValidator;
        }
    }
}
