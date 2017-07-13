import { CascadeMode, ValidationResult, Validator } from '../src/index'

export class EmployeeModel {
    public email: string
    public firstName: string
    public lastName: string
}

let validateAnsync = (email: string, message: string = ''): Promise<ValidationResult> => {
    let model: EmployeeModel = new EmployeeModel()

    //setup
    model.email = email

    //act
    let validator = new Validator<EmployeeModel>(CascadeMode.StopOnFirstFailure)
    let rule = validator.addRule(model.email)
        .withParameterName('email')
        .emailAddress()

    if (message.length > 0)
        rule.withMessage(message)

    return validator.validateAsync(model)
}

describe('email validation', () => {
    it('can validate validemail@email.com as email', async () => {

        let result = await validateAnsync('validemail@email.com')

        //assert
        expect(result.isValid())
            .toBeTruthy()

        expect(result.errors.length)
            .toBe(0)
    })

    it('can validate validemail+123@email.verylongsuffix as email', async () => {

        let result = await validateAnsync('validemail+123@email.verylongsuffix')

        //assert
        expect(result.isValid())
            .toBeTruthy()

        expect(result.errors.length)
            .toBe(0)
    })

    it('can validate validemail@email.com.ph as email', async () => {

        let result = await validateAnsync('validemail@email.com.ph')

        //assert
        expect(result.isValid())
            .toBeTruthy()

        expect(result.errors.length)
            .toBe(0)
    })

    it('can validate invalid email', async () => {

        let result = await validateAnsync('validemailemail.com')

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].propertyName)
            .toBe('email')

        expect(result.errors[0].propertyValue)
            .toBe('validemailemail.com')
    })

    it('can validate invalid email', async () => {

        let result = await validateAnsync('validemailemail')

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].propertyName)
            .toBe('email')

        expect(result.errors[0].propertyValue)
            .toBe('validemailemail')
    })

    it('can return the set custom error message', async () => {

        let result = await validateAnsync('notvalidemail', 'this is custom message')

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].errorMessage)
            .toBe('this is custom message')
    })
})
