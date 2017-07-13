"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
class EmployeeModel {
}
exports.EmployeeModel = EmployeeModel;
let validateAnsync = (email, message = '') => {
    let model = new EmployeeModel();
    model.email = email;
    let validator = new index_1.Validator(index_1.CascadeMode.StopOnFirstFailure);
    let rule = validator.addRule(model.email)
        .withParameterName('email')
        .emailAddress();
    if (message.length > 0)
        rule.withMessage(message);
    return validator.validateAsync(model);
};
describe('email validation', () => {
    it('can validate validemail@email.com as email', async () => {
        let result = await validateAnsync('validemail@email.com');
        expect(result.isValid())
            .toBeTruthy();
        expect(result.errors.length)
            .toBe(0);
    });
    it('can validate validemail+123@email.verylongsuffix as email', async () => {
        let result = await validateAnsync('validemail+123@email.verylongsuffix');
        expect(result.isValid())
            .toBeTruthy();
        expect(result.errors.length)
            .toBe(0);
    });
    it('can validate validemail@email.com.ph as email', async () => {
        let result = await validateAnsync('validemail@email.com.ph');
        expect(result.isValid())
            .toBeTruthy();
        expect(result.errors.length)
            .toBe(0);
    });
    it('can validate invalid email', async () => {
        let result = await validateAnsync('validemailemail.com');
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].propertyName)
            .toBe('email');
        expect(result.errors[0].propertyValue)
            .toBe('validemailemail.com');
    });
    it('can validate invalid email', async () => {
        let result = await validateAnsync('validemailemail');
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].propertyName)
            .toBe('email');
        expect(result.errors[0].propertyValue)
            .toBe('validemailemail');
    });
    it('can return the set custom error message', async () => {
        let result = await validateAnsync('notvalidemail', 'this is custom message');
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].errorMessage)
            .toBe('this is custom message');
    });
});
