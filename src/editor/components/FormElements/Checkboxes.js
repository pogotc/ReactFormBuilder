import React from 'react';
import FormComponent from './FormComponent';

class Checkboxes extends FormComponent {

    getFriendlyName() {
        return "Checkboxes";
    }

    getGlyphiconName() {
        return "glyphicon-check";
    }

    render() {
        let attrs = this.getAttributesFromProps();
        let selectedCheckboxes = this.props.value || new Set();
        attrs['onChange'] = (e) => {
            let label = e.target.value;
            if (selectedCheckboxes.has(label)) {
                selectedCheckboxes.delete(label);
            } else {
                selectedCheckboxes.add(label);
            }
            this.props.handleFieldUpdate(this.props.label, selectedCheckboxes);
        };
        let choices = null;
        if (this.props.options && this.props.options.choices) {
            choices = this.props.options.choices.split("\n").map((optionValue) => {
                let keyValueCheck = optionValue.match(/([^:]+):(.*)/);
                let value = optionValue;
                let label = optionValue;
                if (keyValueCheck !== null && keyValueCheck.length) {
                    value = keyValueCheck[1];
                    label = keyValueCheck[2];
                }
                let key = label.replace(' ', '') + '-' + value;
                let isChecked = selectedCheckboxes.has(value);
                attrs['value'] = value;
                return <div className="checkbox" key={key}>
                            <label>
                                <input type="checkbox" 
                                    checked={isChecked}
                                    {...attrs} />
                                {label}
                            </label>
                        </div>;
            });
        }
        

        return (
            <div className={'form-group ' + (this.props.isSelected ? 'selected' : '')} onClick={this.handleFieldClick}>
                <label>{ this.props.label }</label>
                {this.getHelpText()}
                {choices}
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

export default Checkboxes;