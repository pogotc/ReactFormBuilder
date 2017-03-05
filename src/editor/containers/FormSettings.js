import React, { Component } from 'react';

class FormSettings extends Component {
    
    render() {
        let formName = this.props.formData.name || "Untitled";
        return (
            <div className={'control-panel-content ' + (!this.props.active ? 'hidden' :'')}>
                <div className="form-group">
                    <label>Form Name</label>
                    <input type="text" 
                        className="form-control" 
                        value={formName} 
                        onChange={(e) => this.props.handleFormSettingUpdate("name", e.target.value)}/> 
                </div>
                <div className="form-group">
                    <label>Confirmation Page Heading</label>
                    <input type="text" 
                        className="form-control" 
                        value={this.props.formData.confirmation_page_heading || ""} 
                        onChange={(e) => this.props.handleFormSettingUpdate("confirmation_page_heading", e.target.value)}/> 
                </div>
                <div className="form-group">
                    <label>Confirmation Page Message</label>
                    <textarea 
                        className="form-control" 
                        value={this.props.formData.confirmation_page_message || ""} 
                        onChange={(e) => this.props.handleFormSettingUpdate("confirmation_page_message", e.target.value)}/> 
                </div>
            </div>
        )
    }

}

export default FormSettings;