"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
class EmployeeModel {
}
exports.EmployeeModel = EmployeeModel;
let validateAnsync = (specialValue, secoundObject, message = '') => {
    let model = new EmployeeModel();
    model.specialValue = specialValue;
    let validator = new index_1.Validator(index_1.CascadeMode.StopOnFirstFailure);
    let rule = validator.addRule(model.specialValue)
        .withParameterName('firstName')
        .equal(secoundObject);
    if (message.length > 0)
        rule.withMessage(message);
    return validator.validateAsync(model);
};
describe('equal validation', () => {
    it('return valid when two string values are equal', async () => {
        let result = await validateAnsync('validemail', 'validemail');
        expect(result.isValid())
            .toBeTruthy();
        expect(result.errors.length)
            .toBe(0);
    });
    it('return valid when two numbers values are equal', async () => {
        let result = await validateAnsync(100, 100);
        expect(result.isValid())
            .toBeTruthy();
        expect(result.errors.length)
            .toBe(0);
    });
    it('return invalid when two string values are NOT equal', async () => {
        let result = await validateAnsync('ZZZZZZZ', 'notequal');
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].propertyName)
            .toBe('firstName');
        expect(result.errors[0].propertyValue)
            .toBe('ZZZZZZZ');
    });
    it('return invalid when two numbers values are NOT equal', async () => {
        let result = await validateAnsync(100, 200);
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].propertyName)
            .toBe('firstName');
        expect(result.errors[0].propertyValue)
            .toBe(100);
    });
    it('return invalid when two values are NOT equal', async () => {
        let result = await validateAnsync(100, 'firtname');
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].propertyName)
            .toBe('firstName');
        expect(result.errors[0].propertyValue)
            .toBe(100);
    });
    it('can return the set custom error message', async () => {
        let result = await validateAnsync('ZZZZZZZ', 'notequal');
        expect(result.isValid())
            .toBeFalsy();
        expect(result.errors.length)
            .toBe(1);
        expect(result.errors[0].propertyValue)
            .toBe('ZZZZZZZ');
    });
});
