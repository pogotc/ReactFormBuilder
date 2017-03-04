import React from 'react';
import FormComponent from './FormComponent';

class Select extends FormComponent {

    render() {
        var attrs = {};
        if (this.props.isReadOnly === "true") {
            attrs['readOnly'] = 'readOnly';
            attrs['disabled'] = 'disabled';
        }

        let options = <option />

        if (this.props.options) {
            options = this.props.options.split("\n").map((optionValue) => {
                console.log(optionValue);
                return <option key={optionValue} value={optionValue}>{optionValue}</option>;
            });
        }

        return (
            <div className={'form-group ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleFieldClick}>
                <label>{ this.props.label }</label>
                <select className="form-control" {...attrs}>
                    {options}
                </select>
            </div>
        )
    }

    getEditorFieldOptions() {
        return {
            
        }
    }
};

let fieldOptions = {
    label: "Choices (one per line)",
    type: "textarea",
    default: "First choice\nSecond choice\nThird choice"
};

export {fieldOptions};

export default Select;