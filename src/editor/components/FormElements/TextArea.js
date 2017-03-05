import React from 'react';
import FormComponent from './FormComponent';

class TextArea extends FormComponent {

    render() {
        let attrs = this.getAttributesFromProps();
        
        return (
            <div className={'form-group ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleFieldClick}>
                <label>{ this.props.label }</label>
                <textarea className="form-control" {...attrs}></textarea>
            </div>
        )
    }
};

export default TextArea;