import axios from 'axios';

import React, { Component } from 'react';
import FormManager from '../editor/lib/FormManager';
import FormRenderer from '../editor/containers/FormRenderer';

class ViewerMain extends Component {

    availableFieldTypes = ["TextField", "TextArea", "Select"];
    formManager;
    proxyUrl;

    constructor(props) {
        super(props);
        this.state = {
            formData: {name: "", fields:[]},
            formValues: {},
            hasSubmitted: false
        };

        this.proxyUrl = "https://tessituraproxy.site/formbuilder/made1";

        this.formManager = new FormManager(this.proxyUrl);

        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }

    componentDidMount() {
        this.formManager.fetchById(this.props.params.id)
            .then((response) => {
                var formData = response.data;
                this.setState({
			        formData: formData
                });
            })
            .catch((err) => {
                console.log(err);  
            });
    }

    handleFormSubmission(e, formRefs) {
        e.preventDefault();
        formRefs.submitBtn.setAttribute("disabled", "disabled");
        let submissionRequests = [];
        this.state.formData.submissionHandlers.forEach((handlerConfig) => {
            let handlerName = handlerConfig.name;

            let handlerClass = require('../submissionHandlers/' + handlerName).default;
            let handler = new handlerClass(this.proxyUrl);
            submissionRequests.push(handler.handleSubmission(handlerConfig.options, this.state.formValues))
        });
        axios.all(submissionRequests).then((response) => {
            formRefs.submitBtn.removeAttribute("disabled");
            this.setState({hasSubmitted: true});
        });
    }

    handleFieldUpdate(fieldName, value) {
        this.setState((oldState) => {
            oldState.formValues[fieldName] = value;
        });
    }

    render() {
        if (!this.state.hasSubmitted) {
            return this.renderForm();
        } else {
            return this.renderFormConfirmation();
        }
    }

    renderFormConfirmation() {
        return (
            <div className="container form-view">
                <h2>{this.state.formData.name}</h2>
                <div className="alert alert-success">Thank you for your submission</div>
                <p>Someone will be in touch shortly</p>
            </div>
        );
    }

    renderForm() {
        return (
            <div className="container form-view">
                <FormRenderer 
                    formData={this.state.formData} 
                    availableFieldTypes={this.availableFieldTypes}
                    onFormSubmit={this.handleFormSubmission}
                    handleFieldUpdate={this.handleFieldUpdate}
                    values={this.state.formValues}
                    isReadOnly="false"
                />
            </div>
        )
    }
}

export default ViewerMain;