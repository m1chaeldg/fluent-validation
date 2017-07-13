import { ValidationResult } from './results/validation.result'
import { ValidationFailure } from './results/validation.failure'
import { CascadeMode } from './enum'
import { PropertyRule } from "./property.rule";
import { RuleBuilder } from "./rule.builder";

export class ValidatorContext<T> {
    cascade: CascadeMode;
    constructor(public instanceToValidate: T) {

    }
}

export class Validator<TInstance> {
    rules: Array<PropertyRule<TInstance>> = [];
    constructor(private cascadeMode: CascadeMode = CascadeMode.StopOnFirstFailure) {

    }

    public async validateAsync(instanceToValidate: TInstance): Promise<ValidationResult> {

        let ctx = new ValidatorContext<TInstance>(instanceToValidate);
        ctx.cascade = this.cascadeMode

        let validationFailures = new Array<ValidationFailure>();

        for (let rule of this.rules) {
            let results = await rule.validateAsync(ctx);

            validationFailures = validationFailures.concat(results)
        }

        return new ValidationResult(validationFailures);

    }

    public addRule<TProperty>(valueToValidate: TProperty): RuleBuilder<TInstance, TProperty> {
        let rule = new PropertyRule(valueToValidate, this);

        this.rules.push(rule)

        let builder = new RuleBuilder<TInstance, TProperty>(rule);

        return builder;
    }
}
