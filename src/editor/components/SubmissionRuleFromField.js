import React, { Component } from 'react';

class SubmissionRuleFromField extends Component {

    render() {
        let choices = [];
        
        if (this.props.formFields) {
            choices = this.props.formFields.map((field) => {
                return <option key={field.id} value={field.id}>{field.label}</option>;
            });
        }

        return <select 
                    type="text" 
                    className="form-control" 
                    value={this.props.value} 
                    onChange={(e) => this.props.onUpdate(this.props.fieldName, e.target.value)} 
                >
                {choices}
                </select>
    }
}

SubmissionRuleFromField.propTypes = {
  value: React.PropTypes.string.isRequired,
  fieldName: React.PropTypes.string.isRequired,
  onUpdate: React.PropTypes.func.isRequired
};

export default SubmissionRuleFromField;