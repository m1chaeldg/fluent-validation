"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
class EmployeeModel {
}
exports.EmployeeModel = EmployeeModel;
let validateAnsync = (firstName, condition, message = '') => {
    let model = new EmployeeModel();
    model.firstName = firstName;
    let validator = new index_1.Validator(index_1.CascadeMode.StopOnFirstFailure);
    let rule = validator.addRule(model.firstName)
        .withParameterName('firstName')
        .must(condition);
    if (message.length > 0)
        rule.withMessage(message);
    return validator.validateAsync(model);
};
describe('must validation', () => {
    it('return valid when the must condition return valid/true', async () => {
        let result = await validateAnsync('validemail', (model, propertyValue, propertyValidatorContext) => {
            return Promise.resolve(true);
        });
        expect(result.isValid())
            .toBeTruthy();
        expect(result.errors.length)
            .toBe(0);
    });
    it('return invalid when the must condition return invalid/false', async () => {
        let result = await validateAnsync('validemail', (model, propertyValue, propertyValidatorContext) => {
            return Promise.resolve(false);
        });
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].propertyName)
            .toBe('firstName');
        expect(result.errors[0].propertyValue)
            .toBe('validemail');
    });
    it('can return the set custom error message', async () => {
        let result = await validateAnsync('validemail', (model, propertyValue, propertyValidatorContext) => {
            return Promise.resolve(false);
        }, 'this is custom message');
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].errorMessage)
            .toBe('this is custom message');
    });
});
