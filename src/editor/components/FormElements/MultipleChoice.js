import React from 'react';
import FormComponent from './FormComponent';

class MultipleChoice extends FormComponent {

    getFriendlyName() {
        return "Multiple Choice";
    }

    getGlyphiconName() {
        return "glyphicon-record";
    }

    render() {
        let attrs = this.getAttributesFromProps();

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
                attrs['value'] = value;
                return <div className="radio" key={key}>
                            <label>
                                <input  type="radio" 
                                        name={this.props.label} 
                                        checked={this.props.value === value}
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

export default MultipleChoice;