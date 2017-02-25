import React, { Component } from 'react';

class EditField extends Component {

    constructor(props)  {
        super(props);
        this.handleFieldNameEdit = this.handleFieldNameEdit.bind(this);
    }

    handleFieldNameEdit(e) {
        var newField = this.props.fieldBeingEdited;
        newField.label = e.target.value;
        
        if (this.props.onFieldUpdate) {
            this.props.onFieldUpdate(newField);
        }
    }

    render() {
        return (
            <div className={!this.props.active ? 'hidden' :''}>
                <div className="form-group">
                    <label>Field Label</label>
                    <input type="text" className="form-control" value={this.props.fieldBeingEdited.label} onChange={this.handleFieldNameEdit}/> 
                </div>
            </div>
        )
    }

}

export default EditField;