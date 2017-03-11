import React, { Component } from 'react';

class SubmissionRuleEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldValues: JSON.parse(JSON.stringify(this.props.ruleValues))
        }
        this.saveChanges = this.saveChanges.bind(this);
    }

    onRuleUpdate(field, newValue) {
        // let updatedRule = this.props.ruleValues;
        // updatedRule[field] = newValue;
        // this.props.onUpdateRule(this.props.ruleId, updatedRule);
        this.setState((state) => {
            state.fieldValues[field] = newValue;
        });
    }

    saveChanges() {
        this.props.onUpdateRule(this.props.ruleId, this.state.fieldValues);
        this.props.onGoBack();
    }

    render() {
        let fields = this.props.rule.getEditFields().map((field) => {
            // let value = this.props.ruleValues[field.name] || "";
            let value = this.state.fieldValues[field.name] || "";
            return  <tr key={field.name}>
                        <td><label>{field.name}</label></td>
                        <td>
                            <input type="text" className="form-control" value={value} onChange={(e) => this.onRuleUpdate(field.name, e.target.value)} />
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