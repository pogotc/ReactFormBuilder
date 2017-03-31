import React, { Component } from 'react';

class SubmissionRuleHardcodeField extends Component {

    render() {
        if (this.props.field.choices) {
            return this.renderFieldChoices();
        } else {
            return this.renderTextEntry();
        }
    }

    renderFieldChoices() {
        let options = [];
        
        options = this.props.field.choices.map((field) => {
                return <option key={field.value} value={field.value}>{field.label}</option>;
            });

        return <select 
                    className="form-control"
                    value={this.props.value} 
                    onChange={(e) => this.props.onUpdate(this.props.field.name, e.target.value)}>{options}</select>
    }

    renderTextEntry() {
        return <input 
                    type="text" 
                    className="form-control" 
                    value={this.props.value} 
                    onChange={(e) => this.props.onUpdate(this.props.field.name, e.target.value)} 
                />
    }
}

SubmissionRuleHardcodeField.propTypes = {
  field: React.PropTypes.object.isRequired,
  onUpdate: React.PropTypes.func.isRequired
};

export default SubmissionRuleHardcodeField;