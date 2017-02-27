import React from 'react';
import FormComponent from './FormComponent';

class TextField extends FormComponent {

    render() {
        var attrs = {};
        if (this.props.isReadOnly === "true") {
            attrs['readOnly'] = 'readOnly';
            attrs['disabled'] = 'disabled';
        }
        return (
            <div className={'form-group ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleFieldClick}>
                <label>{ this.props.label }</label>
                <input type="text" className="form-control" {...attrs} />
            </div>
        )
    }
};

export default TextField;