import { CascadeMode, PropertyValidatorContext, ValidationResult, Validator } from '../src/index'

export class EmployeeModel {
    public firstName: string
}

let validateAnsync = (firstName: string, condition: (model: EmployeeModel, propertyValue: {}, propertyValidatorContext: PropertyValidatorContext<EmployeeModel>) => Promise<boolean>, message: string = ''): Promise<ValidationResult> => {
    let model: EmployeeModel = new EmployeeModel()

    //setup
    model.firstName = firstName

    //act
    let validator = new Validator<EmployeeModel>(CascadeMode.StopOnFirstFailure)
    let rule = validator.addRule(model.firstName)
        .withParameterName('firstName')
        .must(condition)

    if (message.length > 0)
        rule.withMessage(message)

    return validator.validateAsync(model)
}

describe('must validation', () => {
    it('return valid when the must condition return valid/true', async () => {

        let result = await validateAnsync('validemail', (model: EmployeeModel, propertyValue: {}, propertyValidatorContext: PropertyValidatorContext<EmployeeModel>): Promise<boolean> => {
          return Promise.resolve(true)
        })

        //assert
        expect(result.isValid())
            .toBeTruthy()

        expect(result.errors.length)
            .toBe(0)
    })

    it('return invalid when the must condition return invalid/false', async () => {

        let result = await validateAnsync('validemail', (model: EmployeeModel, propertyValue: {}, propertyValidatorContext: PropertyValidatorContext<EmployeeModel>): Promise<boolean> => {
          return Promise.resolve(false)
        })

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].propertyName)
            .toBe('firstName')

        expect(result.errors[0].propertyValue)
            .toBe('validemail')
    })

    it('can return the set custom error message', async () => {

        let result = await validateAnsync('validemail', (model: EmployeeModel, propertyValue: {}, propertyValidatorContext: PropertyValidatorContext<EmployeeModel>): Promise<boolean> => {
          return Promise.resolve(false)
        }, 'this is custom message')

        //assert
        expect(result.isValid())
            .toBeFalsy()

        expect(result.errors.length)
            .toBe(1)

        expect(result.errors[0].errorMessage)
            .toBe('this is custom message')
    })
})
