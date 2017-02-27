import React, { Component } from 'react';

class FormSettings extends Component {
    
    render() {
        let formName = this.props.formName ? this.props.formName : "Untitled";
        return (
            <div className={'control-panel-content ' + (!this.props.active ? 'hidden' :'')}>
                <div className="form-group">
                    <label>Form Name</label>
                    <input type="text" className="form-control" value={formName} onChange={this.props.onFormNameUpdate}/> 
                </div>
            </div>
        )
    }

}

export default FormSettings;