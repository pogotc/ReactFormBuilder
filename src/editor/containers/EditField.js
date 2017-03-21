import React, { Component } from 'react';

class EditField extends Component {

    constructor(props)  {
        super(props);
        this.renderFieldOptions = this.renderFieldOptions.bind(this);
        this.handleFieldNameEdit = this.handleFieldNameEdit.bind(this);
        this.handleFieldTypeEdit = this.handleFieldTypeEdit.bind(this);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleOptionsEdit = this.handleOptionsEdit.bind(this);
        this.handleFieldHelpEdit = this.handleFieldHelpEdit.bind(this);
    }

    handleFieldNameEdit(e) {
        this.handleFieldUpdate("label", e.target.value);
    }

    handleFieldTypeEdit(e) {
        this.handleFieldUpdate("type", e.target.value);
    }

    handleFieldHelpEdit(e) {
        this.handleFieldUpdate("help", e.target.value);
    }

    handleOptionsEdit(optionName, newVal) {
        var options = this.props.fieldBeingEdited.options;
        if (options == null || typeof(options) !== "object") {
            options = {};
        }
        options[optionName] = newVal;
        this.handleFieldUpdate("options", options);
    }

    handleFieldUpdate(fieldName, newValue) {
        var newField = this.props.fieldBeingEdited;
        newField[fieldName] = newValue;
        if (this.props.onFieldUpdate) {
            this.props.onFieldUpdate(newField);
        }
    }

    renderFieldOptions(config) {

        let fieldOptions = [];

        for (let optionName in config) {
            if (config.hasOwnProperty(optionName)) {
                let optionConfig = config[optionName];
                let FieldOptionType = optionConfig.type || "textarea";
                let optionsValue = this.props.fieldBeingEdited.options[optionName] || optionConfig.default;
                let fieldTypeOptions =  <div className="form-group" key={optionName}>
                                            <label>{optionConfig.label}</label>
                                            <FieldOptionType 
                                                    className="form-control" 
                                                    value={optionsValue}
                                                    onChange={(e) => this.handleOptionsEdit(optionName, e.target.value)}
                                                    />
                                        </div>;
                fieldOptions.push(fieldTypeOptions);
            }
        }

        return fieldOptions;
    }

    render() {
        var FieldTypeOptions = this.props.availableFieldTypes.map((fieldTypeName, i) => {
            return <option value={fieldTypeName} key={fieldTypeName}>{fieldTypeName}</option>;
        });

        var fieldIsSelected = this.props.fieldBeingEdited.id !== undefined;
        var fieldTypeName = this.props.fieldBeingEdited.type;
        let fieldTypeOptions = null;
        
        if (fieldTypeName) {
            let fieldTypeOptionsConfig = require('../components/FormElements/' + fieldTypeName).fieldOptions;
            
            if (fieldTypeOptionsConfig) {
                fieldTypeOptions = this.renderFieldOptions(fieldTypeOptionsConfig);
            }
        }
        

        return (
            <div className={'control-panel-content ' + (!this.props.active ? 'hidden' :'')}>
                <p className={fieldIsSelected ? 'hidden' : ''}>No field selected</p>
                <div className={!fieldIsSelected ? 'hidden' : ''}>
                    <div className="form-group">
                        <label>Field Label</label>
                        <input type="text" className="form-control" value={this.props.fieldBeingEdited.label} onChange={this.handleFieldNameEdit}/> 
                    </div>
                    <div className="form-group">
                        <label>Field Help</label>
                        <input type="text" className="form-control" value={this.props.fieldBeingEdited.help || ""} onChange={this.handleFieldHelpEdit}/> 
                    </div>
                    <div className="form-group">
                        <label>Field Type</label>
                        <select className="form-control" value={this.props.fieldBeingEdited.type} onChange={this.handleFieldTypeEdit}>
                            <option>Select field type</option>
                            {FieldTypeOptions}
                        </select>
                    </div>
                    {fieldTypeOptions}
                </div>
                <button className="btn btn-danger" onClick={this.props.onFieldDelete}>Delete Field</button>
            </div>
        )
    }

}

export default EditField;