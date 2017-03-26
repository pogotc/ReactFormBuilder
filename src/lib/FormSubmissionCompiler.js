
class FormSubmissionCompiler {

    fieldIdToNameMap;

    constructor(fieldIdToNameMap) {
        this.fieldIdToNameMap = fieldIdToNameMap;
    }

    compile(submissionRuleConfig, formValues) {
        let compiledValues = {};
        for (let ruleParam in submissionRuleConfig) {
            if (!submissionRuleConfig.hasOwnProperty(ruleParam) || ruleParam === '_formid') {
                continue;
            }
            let ruleConfig = submissionRuleConfig[ruleParam];
            let value = undefined;
            switch (ruleConfig['source']) {
                case "Hardcode":
                    value = this.handleHardcoded(ruleConfig);
                    break;
                case "From Field":
                    value = this.handleFromField(ruleConfig, formValues);
                    break;
                case "From Script":
                    value = this.handleScript(ruleConfig, formValues);
                    break;
            }
            compiledValues[ruleParam] = value;
        }
        return compiledValues;
    }

    handleHardcoded(ruleConfig) {
        return ruleConfig['value'];
    }

    handleFromField(ruleConfig, formValues) {
        let fieldId = ruleConfig['value'];
        let fieldName = this.fieldIdToNameMap[fieldId];
        return formValues[fieldName];
    }

    handleScript(ruleConfig, formValues) {
        let _compileFunc = function() {};
        let script = "window._compileFunc = " + ruleConfig.value;
        eval(script);
        return window._compileFunc(formValues);
    }
}

export default FormSubmissionCompiler;