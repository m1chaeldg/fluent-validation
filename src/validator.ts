import { CascadeMode } from './enum'
import { PropertyRule } from './property.rule'
import { ValidationFailure } from './results/validation.failure'
import { ValidationResult } from './results/validation.result'
import { RuleBuilder } from './rule.builder'

export class ValidatorContext<T> {
    public cascade: CascadeMode
    constructor(public instanceToValidate: T) {

    }
}

export class Validator<TInstance> {
    private rules: PropertyRule<TInstance>[] = []
    constructor(private cascadeMode: CascadeMode = CascadeMode.StopOnFirstFailure) {

    }

    public async validateAsync(instanceToValidate: TInstance): Promise<ValidationResult> {

        let ctx: ValidatorContext<TInstance> = new ValidatorContext<TInstance>(instanceToValidate)
        ctx.cascade = this.cascadeMode

        let validationFailures: ValidationFailure[] = []

        for (let rule of this.rules) {
            let results: ValidationFailure[] = await rule.validateAsync(ctx)

            validationFailures = validationFailures.concat(results)
        }

        return new ValidationResult(validationFailures)

    }

    public addRule<TProperty>(valueToValidate: TProperty): RuleBuilder<TInstance, TProperty> {
        let rule: PropertyRule<TInstance> = new PropertyRule(valueToValidate, this)

        this.rules.push(rule)

        let builder = new RuleBuilder<TInstance, TProperty>(rule)

        return builder
    }
}
