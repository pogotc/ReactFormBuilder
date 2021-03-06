import React from 'react';
import FormComponent from './FormComponent';

class TextField extends FormComponent {

    getFriendlyName() {
        return "Single Line Text";
    }

    render() {
        let attrs = this.getAttributesFromProps();

        return (
            <div className={'form-group ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleFieldClick}>
                <label>{ this.props.label }</label>
                {this.getHelpText()}
                <input type="text" className="form-control" {...attrs} />
            </div>
        )
    }
};

export default TextField;
