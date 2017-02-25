import React, { Component } from 'react';

class EditField extends Component {

    constructor(props)  {
        super(props);
        this.handleFieldNameEdit = this.handleFieldNameEdit.bind(this);
        this.handleFieldTypeEdit = this.handleFieldTypeEdit.bind(this);
        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
    }

    handleFieldNameEdit(e) {
        this.handleFieldUpdate("label", e.target.value);
    }

    handleFieldTypeEdit(e) {
        this.handleFieldUpdate("type", e.target.value);
    }

    handleFieldUpdate(fieldName, newValue) {
        var newField = this.props.fieldBeingEdited;
        newField[fieldName] = newValue;
        if (this.props.onFieldUpdate) {
            this.props.onFieldUpdate(newField);
        }
    }

    render() {
        var FieldTypeOptions = this.props.availableFieldTypes.map((fieldTypeName, i) => {
            return <option value={fieldTypeName} key={i}>{fieldTypeName}</option>;
        });

        var fieldIsSelected = this.props.fieldBeingEdited.id !== undefined;
        
        return (
            <div className={!this.props.active ? 'hidden' :''}>
                <p className={fieldIsSelected ? 'hidden' : ''}>No field selected</p>
                <div className={!fieldIsSelected ? 'hidden' : ''}>
                    <div className="form-group">
                        <label>Field Label</label>
                        <input type="text" className="form-control" value={this.props.fieldBeingEdited.label} onChange={this.handleFieldNameEdit}/> 
                    </div>
                    <div className="form-group">
                        <label>Field Type</label>
                        <select className="form-control" value={this.props.fieldBeingEdited.type} onChange={this.handleFieldTypeEdit}>
                            <option>Select field type</option>
                            {FieldTypeOptions}
                        </select>
                    </div>
                </div>
            </div>
        )
    }

}

export default EditField;