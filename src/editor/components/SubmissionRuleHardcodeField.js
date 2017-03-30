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
        
        for (var val in this.props.field.choices){
            if (this.props.field.choices.hasOwnProperty(val)) {
                let label = this.props.field.choices[val];
                options.push(<option key={val} value={val}>{label}</option>);
            }
        }
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
  value: React.PropTypes.string.isRequired,
  field: React.PropTypes.object.isRequired,
  onUpdate: React.PropTypes.func.isRequired
};

export default SubmissionRuleHardcodeField;