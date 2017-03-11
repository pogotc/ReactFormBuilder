import axios from 'axios';

import React, { Component } from 'react';
import FormManager from '../editor/lib/FormManager';
import FormRenderer from '../editor/containers/FormRenderer';
import Tessitura from '../lib/Tessitura';

class ViewerMain extends Component {

    availableFieldTypes = ["TextField", "TextArea", "Select"];
    formManager;
    proxyUrl;
    tessituraClient;
    clientName;

    constructor(props) {
        super(props);
        this.state = {
            formData: {name: "", fields:[]},
            formValues: {},
            hasSubmitted: false
        };

        let appConfig = props.route.appConfig;
        this.clientName = appConfig.client;
        this.proxyUrl = appConfig.proxyUrl;


        this.tessituraClient = new Tessitura(this.proxyUrl + "/tessitura/" + this.clientName);

        this.formManager = new FormManager(this.proxyUrl + "/formbuilder/" + this.clientName, appConfig.s3base, this.clientName);

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
            let handler = new handlerClass(this.proxyUrl, this.tessituraClient, this.clientName);
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

        let confirmationHeading = this.state.formData.confirmation_page_heading || "Submission Received";
        let confirmationBody = null;

        if (this.state.formData.confirmation_page_message) {
            confirmationBody = <p>{this.state.formData.confirmation_page_message}</p>;
        }

        return (
            <div className="container form-view">
                <h2>{this.state.formData.name}</h2>
                <div className="alert alert-success">{confirmationHeading}</div>
                {confirmationBody}
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