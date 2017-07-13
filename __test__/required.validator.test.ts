import { CascadeMode, ValidationResult, Validator } from '../src/index'

export class EmployeeModel {
    public firstName: string
}

let validateAnsync = (firstName: string, message: string = ''): Promise<ValidationResult> => {
    let model: EmployeeModel = new EmployeeModel()

    //setup
    model.firstName = firstName

    //act
    let validator = new Validator<EmployeeModel>(CascadeMode.StopOnFirstFailure)
    let rule = validator.addRule(model.firstName)
        .withParameterName('firstName')
        .required()

    if (message.length > 0)
        rule.withMessage(message)

    return validator.validateAsync(model)
}

describe('required validation', () => {
    it('can validate required field when input is valid', async () => {

        let result = await validateAnsync('validemail')

        //assert
        expect(result.isValid())
            .toBeTruthy()

        expect(result.errors.length)
            .toBe(0)
    })

    it('can validate required field when input is whitespace', async () => {

        let result = await validateAnsync(' ')

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].propertyName)
            .toBe('firstName')

        expect(result.errors[0].propertyValue)
            .toBe(' ')
    })

    it('can validate required field when input is blank', async () => {

        let result = await validateAnsync('')

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].propertyName)
            .toBe('firstName')

        expect(result.errors[0].propertyValue)
            .toBe('')
    })

    it('can return the set custom error message', async () => {

        let result = await validateAnsync('', 'this is custom message')

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].errorMessage)
            .toBe('this is custom message')
    })
})
