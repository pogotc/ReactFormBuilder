import React, { Component } from 'react';

class SubmissionRuleFromScript extends Component {

    render() {
        return <textarea 
                    type="text" 
                    className="form-control" 
                    value={this.props.value} 
                    onChange={(e) => this.props.onUpdate(this.props.fieldName, e.target.value)} 
                />
    }
}

SubmissionRuleFromScript.propTypes = {
  value: React.PropTypes.string.isRequired,
  fieldName: React.PropTypes.string.isRequired,
  onUpdate: React.PropTypes.func.isRequired
};

export default SubmissionRuleFromScript;