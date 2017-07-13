export enum CascadeMode {
    /**
     * When a rule fails, execution continues to the next rule.
     */
    Continue,
    /**
     * When a rule fails, validation is stopped and all other rules in the chain will not be executed.
     */
    StopOnFirstFailure
}

export enum ApplyConditionTo {
    /**
     * Applies the condition to all validators declared so far in the chain.
     */
    AllValidators,
    /**
     * Applies the condition to the current validator only.
     */
    CurrentValidator
}