import { CascadeMode, ValidationResult, Validator } from '../src/index'

export class EmployeeModel {
    public specialValue: {}
}

let validateAnsync = (specialValue: {}, secoundObject: {}, message: string = ''): Promise<ValidationResult> => {
    let model: EmployeeModel = new EmployeeModel()

    //setup
    model.specialValue = specialValue

    //act
    let validator = new Validator<EmployeeModel>(CascadeMode.StopOnFirstFailure)
    let rule = validator.addRule(model.specialValue)
        .withParameterName('firstName')
        .equal(secoundObject)

    if (message.length > 0)
        rule.withMessage(message)

    return validator.validateAsync(model)
}

describe('equal validation', () => {
    it('return valid when two string values are equal', async () => {

        let result = await validateAnsync('validemail', 'validemail')

        //assert
        expect(result.isValid())
            .toBeTruthy()

        expect(result.errors.length)
            .toBe(0)
    })

    it('return valid when two numbers values are equal', async () => {

        let result = await validateAnsync(100, 100)

        //assert
        expect(result.isValid())
            .toBeTruthy()

        expect(result.errors.length)
            .toBe(0)
    })

    it('return invalid when two string values are NOT equal', async () => {

        let result = await validateAnsync('ZZZZZZZ', 'notequal')

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].propertyName)
            .toBe('firstName')

        expect(result.errors[0].propertyValue)
            .toBe('ZZZZZZZ')
    })

    it('return invalid when two numbers values are NOT equal', async () => {

        let result = await validateAnsync(100, 200)

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].propertyName)
            .toBe('firstName')

        expect(result.errors[0].propertyValue)
            .toBe(100)
    })

    it('return invalid when two values are NOT equal', async () => {

        let result = await validateAnsync(100, 'firtname')

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].propertyName)
            .toBe('firstName')

        expect(result.errors[0].propertyValue)
            .toBe(100)
    })

    it('can return the set custom error message', async () => {

        let result = await validateAnsync('ZZZZZZZ', 'notequal')

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].propertyValue)
            .toBe('ZZZZZZZ')
    })
})
