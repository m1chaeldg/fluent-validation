"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
class EmployeeModel {
}
exports.EmployeeModel = EmployeeModel;
let validateAnsync = (firstName, message = '') => {
    let model = new EmployeeModel();
    model.firstName = firstName;
    let validator = new index_1.Validator(index_1.CascadeMode.StopOnFirstFailure);
    let rule = validator.addRule(model.firstName)
        .withParameterName('firstName')
        .required();
    if (message.length > 0)
        rule.withMessage(message);
    return validator.validateAsync(model);
};
describe('required validation', () => {
    it('can validate required field when input is valid', async () => {
        let result = await validateAnsync('validemail');
        expect(result.isValid())
            .toBeTruthy();
        expect(result.errors.length)
            .toBe(0);
    });
    it('can validate required field when input is whitespace', async () => {
        let result = await validateAnsync(' ');
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].propertyName)
            .toBe('firstName');
        expect(result.errors[0].propertyValue)
            .toBe(' ');
    });
    it('can validate required field when input is blank', async () => {
        let result = await validateAnsync('');
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].propertyName)
            .toBe('firstName');
        expect(result.errors[0].propertyValue)
            .toBe('');
    });
    it('can return the set custom error message', async () => {
        let result = await validateAnsync('', 'this is custom message');
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].errorMessage)
            .toBe('this is custom message');
    });
});
