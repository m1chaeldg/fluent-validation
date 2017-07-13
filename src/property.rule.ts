import { ApplyConditionTo, CascadeMode } from './enum'
import { ValidationFailure } from './results/validation.failure'
import { Validator, ValidatorContext } from './validator'
import { DelegatingValidator } from './validators/delegating.validator'
import { PropertyValidator } from './validators/property.validator'
import { PropertyValidatorContext } from './validators/property.validator.context'

export class PropertyRule<TInstance> {
    private validators: PropertyValidator<TInstance>[] = []
    public currentValidator: PropertyValidator<TInstance>
    public propertyName: string

    constructor(public propertyValue: {}, public validator: Validator<TInstance>) {

    }

    public async validateAsync(validatorContext: ValidatorContext<TInstance>): Promise<ValidationFailure[]> {
        let validationResults: ValidationFailure[] = []

        let ctx = new PropertyValidatorContext<TInstance>()
        ctx.propertyName = this.propertyName
        ctx.propertyValue = this.propertyValue
        ctx.validatorContext = validatorContext
        ctx.instanceToValidate = validatorContext.instanceToValidate

        for (let validator of this.validators) {

            let results = await validator.validateAsync(ctx)
            let hasFailure = false

            results.forEach(result => {
                validationResults.push(result)
                hasFailure = true
            })

            if (hasFailure && validatorContext.cascade === CascadeMode.StopOnFirstFailure) {
                break
            }
        }

        return validationResults
    }

    public addValidator(validator: PropertyValidator<TInstance>): void {
        this.currentValidator = validator
        this.validators.push(validator)
    }

    public applyCondition(condition: (instance: TInstance) => Promise<boolean>, applyConditionTo: ApplyConditionTo): void {

        if (applyConditionTo === ApplyConditionTo.AllValidators) {
            for (let validator of this.validators) {
                let wrappedValidator = new DelegatingValidator(condition, validator)
                this.replaceValidator(this.currentValidator, wrappedValidator)
            }

        } else {
            let wrappedValidator = new DelegatingValidator(condition, this.currentValidator)
            this.replaceValidator(this.currentValidator, wrappedValidator)
        }

    }

    public replaceValidator(original: PropertyValidator<TInstance>, newValidator: PropertyValidator<TInstance>): void {
        let index = this.validators.indexOf(original)

        if (index > -1) {
            this.validators[index] = newValidator
            this.currentValidator = newValidator
        }
    }
}
