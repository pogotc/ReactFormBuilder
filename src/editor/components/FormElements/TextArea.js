import React from 'react';
import FormComponent from './FormComponent';

class TextArea extends FormComponent {

    render() {
        var attrs = {};
        if (this.props.isReadOnly === "true") {
            attrs['readOnly'] = 'readOnly';
            attrs['disabled'] = 'disabled';
        }
        return (
            <div className={'form-group ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleFieldClick}>
                <label>{ this.props.label }</label>
                <textarea className="form-control" {...attrs}></textarea>
            </div>
        )
    }
};

export default TextArea;