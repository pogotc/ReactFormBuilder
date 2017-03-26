import React, { Component } from 'react';

class SubmissionRuleHardcodeField extends Component {

    render() {
        return <input 
                    type="text" 
                    className="form-control" 
                    value={this.props.value} 
                    onChange={(e) => this.props.onUpdate(this.props.fieldName, e.target.value)} 
                />
    }
}

SubmissionRuleHardcodeField.propTypes = {
  value: React.PropTypes.string.isRequired,
  fieldName: React.PropTypes.string.isRequired,
  onUpdate: React.PropTypes.func.isRequired
};

export default SubmissionRuleHardcodeField;