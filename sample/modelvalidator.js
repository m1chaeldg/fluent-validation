"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
class PersonViewModel {
}
exports.PersonViewModel = PersonViewModel;
exports.PersonValidateAsync = (model) => {
    let validator = new index_1.Validator();
    validator.addRule(model.email)
        .withParameterName('email')
        .required()
        .withMessage('email is required')
        .emailAddress()
        .withMessage('email is invalid');
    validator.addRule(model.age)
        .withParameterName('age')
        .range(1, 100)
        .withMessage('you age is beyond measure');
    return validator.validateAsync(model);
};
let person = {
    age: -1,
    email: "invalidemail"
};
exports.PersonValidateAsync(person)
    .then((result) => {
    console.log(result.isValid());
});
