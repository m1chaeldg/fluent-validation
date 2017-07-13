import { ApplyConditionTo } from './enum'
import { PropertyRule } from './property.rule'
import { LazyStringSource, StaticStringSource } from './string.source'
import { EmailValidator } from './validators/email.validator'
import { EqualValidator } from './validators/equal.validator'
import { IncludesValidator } from './validators/includes.validator'
import { LengthValidator } from './validators/length.validator'
import { NegativeValidator, PositiveValidator, RangeValidator } from './validators/number.validator'
import { PredicateValidator } from './validators/predicate.validator'
import { PropertyValidator } from './validators/property.validator'
import { PropertyValidatorContext } from './validators/property.validator.context'
import { RequiredPropertyValidator } from './validators/required.validator'

export class RuleBuilder<TInstance, UValue>{
    constructor(private rule: PropertyRule<TInstance>) {

    }

    public validate(valueToValidate: UValue): RuleBuilder<TInstance, UValue> {
        this.rule.propertyValue = valueToValidate
        return this
    }

    public withParameterName(propertyName: string): RuleBuilder<TInstance, UValue> {
        this.rule.propertyName = propertyName
        return this
    }

    public withMessage(errorMessage: string): RuleBuilder<TInstance, UValue> {
        this.rule.currentValidator.errorSource = new StaticStringSource(errorMessage)
        return this
    }

    public withLazyLoadMessage(fnLoad: (resourceName: string) => Promise<string>, resourceName: string): RuleBuilder<TInstance, UValue> {
        this.rule.currentValidator.errorSource = new LazyStringSource(fnLoad, resourceName)
        return this
    }

    public required(): RuleBuilder<TInstance, UValue> {
        this.rule.addValidator(new RequiredPropertyValidator())
        return this
    }

    public addRule<TProperty>(valueToValidate: TProperty): RuleBuilder<TInstance, TProperty> {
        return this.rule.validator.addRule(valueToValidate)
    }

    public addValidator(validator: PropertyValidator<TInstance>): RuleBuilder<TInstance, UValue> {
        this.rule.addValidator(validator)
        return this
    }

    /*public build() : Validator<TInstance>{
        //do we need to build? or just return the validator?
        return this.rule.validator;
    }*/

    public length(min: number, max: number): RuleBuilder<TInstance, UValue> {
        this.rule.addValidator(new LengthValidator(min, max))
        return this
    }

    public emailAddress(): RuleBuilder<TInstance, UValue> {
        this.rule.addValidator(new EmailValidator())
        return this
    }

    public equal(objectToCompare: {}): RuleBuilder<TInstance, UValue> {
        this.rule.addValidator(new EqualValidator(objectToCompare))
        return this
    }

    // tslint:disable-next-line
    public when(condition: (instance: TInstance) => Promise<boolean>, applyConditionTo: ApplyConditionTo = ApplyConditionTo.AllValidators): RuleBuilder<TInstance, UValue> {

        this.rule.applyCondition(condition, applyConditionTo)

        return this
    }

    // tslint:disable-next-line
    public unless(condition: (instance: TInstance) => Promise<boolean>, applyConditionTo: ApplyConditionTo = ApplyConditionTo.AllValidators): RuleBuilder<TInstance, UValue> {

        let unlessCondition = async (x: TInstance): Promise<boolean> => {
            return Promise.resolve(!(await condition(x)))
        }

        this.rule.applyCondition(unlessCondition, applyConditionTo)

        return this
    }

    // tslint:disable-next-line
    public must(condition: (model: TInstance, propertyValue: {}, propertyValidatorContext: PropertyValidatorContext<TInstance>) => Promise<boolean>)
        : RuleBuilder<TInstance, UValue> {

        this.rule.addValidator(new PredicateValidator(condition))

        return this
    }

    public includes(stringLieteral: string): RuleBuilder<TInstance, UValue> {
        this.rule.addValidator(new IncludesValidator(stringLieteral))
        return this
    }

    public range(min: number, max: number): RuleBuilder<TInstance, UValue> {
        this.rule.addValidator(new RangeValidator(min, max))
        return this
    }

    public negative(): RuleBuilder<TInstance, UValue> {
        this.rule.addValidator(new NegativeValidator())
        return this
    }

    public positive(): RuleBuilder<TInstance, UValue> {
        this.rule.addValidator(new PositiveValidator())
        return this
    }
}