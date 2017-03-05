import React, { Component } from 'react';

class FormRenderer extends Component {

    elementMap = {};

    constructor(props) {
        super(props);

        props.availableFieldTypes.forEach((field) => {
            this.elementMap[field] = require('../components/FormElements/' + field).default;
        });
        this.handleClick = this.handleClick.bind(this);
        this.handleFormNameClick = this.handleFormNameClick.bind(this);
    }

    handleClick(elem) {
        if (this.props.selectFieldHandler) {
            this.props.selectFieldHandler(elem);
        }
    }

    handleFormNameClick() {
        if (this.props.selectFormNameHandler) {
            this.props.selectFormNameHandler();
        }
    }

    render() {
        let formFields;

        if (this.props.formData.fields) {
            formFields = this.props.formData.fields.map((fieldData, idx) => {
                let FieldType = this.elementMap[fieldData.type];
                return <FieldType   label={fieldData.label} 
                                    isSelected={fieldData.isSelected} 
                                    id={fieldData.id} 
                                    options={fieldData.options}
                                    isReadOnly={this.props.isReadOnly} 
                                    key={fieldData.id} 
                                    onClick={this.handleClick}/>
            });
        }

        if (this.props.onFormSubmit) {
            formFields.push(<button className="btn btn-primary" key="submit-btn">Submit</button>);
        }

        return (
            <div>
                <h2 className={this.props.selectFormName ? 'selected' : ''} onClick={this.handleFormNameClick}>{this.props.formData.name}</h2>
                <form>
                    { formFields }

                </form>
            </div>
        )
    }
}

export default FormRenderer;
