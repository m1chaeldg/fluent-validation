
import { Validator, ValidationResult } from '../src/index';

export class PersonViewModel {
    public email: string
    public age: number
}

export let PersonValidateAsync = (model: PersonViewModel): Promise<ValidationResult> => {
    let validator = new Validator<PersonViewModel>()

    validator.addRule(model.email)
        .withParameterName('email')
        .required()
        .withMessage('email is required')
        .emailAddress()
        .withMessage('email is invalid')

    validator.addRule(model.age)
        .withParameterName('age')
        .range(1, 100)
        .withMessage('you age is beyond measure')

    return validator.validateAsync(model)
}

let person = <PersonViewModel>{
    age: -1,
    email: "invalidemail"
}

PersonValidateAsync(person)
    .then((result: ValidationResult) => {
        console.log(result.isValid())
    })