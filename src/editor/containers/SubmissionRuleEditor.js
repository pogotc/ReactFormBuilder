import React, { Component } from 'react';
import SubmissionRuleHardcodeField from '../components/SubmissionRuleHardcodeField';
import SubmissionRuleFromField from '../components/SubmissionRuleFromField';
import SubmissionRuleFromScript from '../components/SubmissionRuleFromScript';

class SubmissionRuleEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldValues: JSON.parse(JSON.stringify(this.props.ruleValues))
        }
        this.saveChanges = this.saveChanges.bind(this);
        this.onSourceChange = this.onSourceChange.bind(this);
        this.onRuleUpdate = this.onRuleUpdate.bind(this);
    }

    onRuleUpdate(field, newValue) {
        this.setState((state) => {
            if (!state.fieldValues[field]) {
                state.fieldValues[field] = {};
            }
            state.fieldValues[field]["value"] = newValue;
        });
    }

    onSourceChange(field, newSource) {
        this.setState((state) => {
            if (!state.fieldValues[field]) {
                state.fieldValues[field] = {};
            }
            state.fieldValues[field]['source'] = newSource;
        });
    }

    saveChanges() {
        this.props.onUpdateRule(this.props.ruleId, this.state.fieldValues);
        this.props.onGoBack();
    }

    componentWillMount() {
        this.props.rule.getEditFields().forEach((field) => {
            if (!this.state.fieldValues[field.name]) {
                this.setState((state) => {
                    state.fieldValues[field.name] = {};
                    state.fieldValues[field.name].value = "";
                    state.fieldValues[field.name].source = "Hardcode";
                });
            }
        });
    }

    render() {
        let fields = this.props.rule.getEditFields().map((field) => {
            let value = "";
            let source = "Hardcode";

            if (this.state.fieldValues[field.name]) {
                value = this.state.fieldValues[field.name].value;
                source = this.state.fieldValues[field.name].source;
            }
            
            let fieldName = field.name + "-source";

            let sourceOptions = ["Hardcode", "From Field", "From Script"].map((item) => {
                let idSuffix = item.replace(' ', '').toLowerCase();
                return  <label className="radio-inline" key={fieldName + '-' + idSuffix}>
                            <input type="radio" 
                                   checked={item === source} 
                                   name={fieldName} 
                                   id={fieldName + '-' + idSuffix} 
                                   onChange={(e) => this.onSourceChange(field.name, e.target.value)}
                                   value={item} /> {item}
                        </label>
            });
            let SubmissionRuleField = undefined;
            if (source === "From Field") {
                SubmissionRuleField = SubmissionRuleFromField;
            } else if (source === "From Script") {
                SubmissionRuleField = SubmissionRuleFromScript;
            } else {
                SubmissionRuleField = SubmissionRuleHardcodeField;
            }


            return  <tr key={field.name}>
                        <td><label>{field.name}</label></td>
                        <td>
                            <div className="field-source">
                                {sourceOptions}
                            </div>

                            <SubmissionRuleField formFields={this.props.formFields} value={value} field={field} onUpdate={this.onRuleUpdate} />
                        </td>
                    </tr>;
        });

        return (
            <div>
                <h3>{this.props.rule.getFriendlyName()}</h3>
                <table className="table">
                    <tbody>
                        {fields}
                    </tbody>
                </table>
                <button className="btn btn-default" onClick={this.props.onGoBack}>Cancel</button>  
                <button className="btn btn-primary pull-right" onClick={this.saveChanges}>Done</button>  
            </div>
        )
    }
}

SubmissionRuleEditor.propTypes = {
    rule: React.PropTypes.object,
    ruleId: React.PropTypes.number,
    ruleValues: React.PropTypes.object,
    formFields: React.PropTypes.array,
    onGoBack: React.PropTypes.func,
    onUpdateRule: React.PropTypes.func
};

export default SubmissionRuleEditor;