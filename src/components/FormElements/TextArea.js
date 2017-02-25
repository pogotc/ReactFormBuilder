import React from 'react';
import FormComponent from './FormComponent';

class TextArea extends FormComponent {

    render() {
        return (
            <div className={'form-group ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleFieldClick}>
                <label>{ this.props.label }</label>
                <textarea className="form-control"></textarea>
            </div>
        )
    }
};

export default TextArea;