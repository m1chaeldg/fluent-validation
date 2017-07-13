"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CascadeMode;
(function (CascadeMode) {
    CascadeMode[CascadeMode["Continue"] = 0] = "Continue";
    CascadeMode[CascadeMode["StopOnFirstFailure"] = 1] = "StopOnFirstFailure";
})(CascadeMode = exports.CascadeMode || (exports.CascadeMode = {}));
var ApplyConditionTo;
(function (ApplyConditionTo) {
    ApplyConditionTo[ApplyConditionTo["AllValidators"] = 0] = "AllValidators";
    ApplyConditionTo[ApplyConditionTo["CurrentValidator"] = 1] = "CurrentValidator";
})(ApplyConditionTo = exports.ApplyConditionTo || (exports.ApplyConditionTo = {}));
