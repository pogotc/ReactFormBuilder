import React from 'react';
import FormComponent from './FormComponent';

class TextField extends FormComponent {

    render() {
        return (
            <div className={'form-group ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleFieldClick}>
                <label>{ this.props.label }</label>
                <input type="text" className="form-control" value="" />
            </div>
        )
    }
};

export default TextField;