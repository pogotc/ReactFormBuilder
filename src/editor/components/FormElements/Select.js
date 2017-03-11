import React from 'react';
import FormComponent from './FormComponent';

class Select extends FormComponent {

    getFriendlyName() {
        return "Dropdown";
    }

    getGlyphiconName() {
        return "glyphicon-triangle-bottom";
    }

    render() {
        let attrs = this.getAttributesFromProps();

        let choices = <option />
        
        if (this.props.options && this.props.options.choices) {
            choices = this.props.options.choices.split("\n").map((optionValue) => {
                return <option key={optionValue} value={optionValue}>{optionValue}</option>;
            });
        }
        

        return (
            <div className={'form-group ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleFieldClick}>
                <label>{ this.props.label }</label>
                <select className="form-control" {...attrs}>
                    {choices}
                </select>
            </div>
        )
    }
};

let fieldOptions = {
    "choices": {
        label: "Choices (one per line)",
        type: "textarea",
        default: "First choice\nSecond choice\nThird choice"
    }
};

export {fieldOptions};

export default Select;