import React, { Component } from 'react';

class FormRenderer extends Component {

    elementMap = {};

    constructor(props) {
        super(props);

        props.availableFieldTypes.forEach((field) => {
            this.elementMap[field] = require('../components/FormElements/' + field).default;
        });
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(elem) {
        if (this.props.selectFieldHandler) {
            this.props.selectFieldHandler(elem);
        }
    }

    render() {
        let formFields;

        if (this.props.formData) {
            formFields = this.props.formData.map((fieldData, idx) => {
                let FieldType = this.elementMap[fieldData.type];
                return <FieldType label={fieldData.label} isSelected={fieldData.isSelected} id={fieldData.id} isReadOnly={this.props.isReadOnly} key={idx} onClick={this.handleClick}/>
            });
        }

        if (this.props.onFormSubmit) {
            formFields.push(<button className="btn btn-primary" key="submit-btn">Submit</button>);
        }

        return (
            <form>
                { formFields }

            </form>
        )
    }
}

export default FormRenderer;
