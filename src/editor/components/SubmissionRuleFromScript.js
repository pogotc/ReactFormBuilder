import React, { Component } from 'react';

class SubmissionRuleFromScript extends Component {

    render() {
        return <textarea 
                    type="text" 
                    className="form-control" 
                    value={this.props.value} 
                    onChange={(e) => this.props.onUpdate(this.props.field.name, e.target.value)} 
                />
    }
}

SubmissionRuleFromScript.propTypes = {
  value: React.PropTypes.string.isRequired,
  field: React.PropTypes.object.isRequired,
  onUpdate: React.PropTypes.func.isRequired
};

export default SubmissionRuleFromScript;