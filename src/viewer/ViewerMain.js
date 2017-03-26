import axios from 'axios';

import React, { Component } from 'react';
import FormManager from '../editor/lib/FormManager';
import FormRenderer from '../editor/containers/FormRenderer';
import Tessitura from '../lib/Tessitura';
import FormSubmissionCompiler from '../lib/FormSubmissionCompiler';

class ViewerMain extends Component {

    availableFieldTypes = ["TextField", "TextArea", "Select"];
    formManager;
    proxyUrl;
    clientName;
    sessionKey;
    appConfig;
    Header;
    Footer;

    constructor(props) {
        super(props);
        this.state = {
            formData: {name: "", fields:[]},
            formValues: {},
            hasSubmitted: false
        };
        this.appConfig = props.route.appConfig;
        this.clientName = this.appConfig.client;
        this.proxyUrl = this.appConfig.proxyUrl;
        this.formManager = new FormManager(this.proxyUrl + "/formbuilder/" + this.clientName, this.appConfig.s3base, this.clientName);

        this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);

        require('../themes/' + this.clientName + '/styles.css');
        this.Header = require('../themes/' + this.clientName + '/header').default; 
        this.Footer = require('../themes/' + this.clientName + '/footer').default; 
    }

    componentDidMount() {
        this.formManager.fetchById(this.props.params.id)
            .then((response) => {
                var formData = response.data;
                this.setState({
			        formData: formData
                });
                document.title = formData.name;
            })
            .catch((err) => {
                console.log(err);  
            });
    }

    handleFormSubmission(e, formRefs) {
        e.preventDefault();

        let sessionKey;
        if (this.props.sessionKey) {
            sessionKey = this.props.sessionKey;
        } else {
            sessionKey = this.props.location.query['sessionkey'];
        }
        
        let tessituraClient = new Tessitura(this.proxyUrl + "/tessitura/" + this.clientName, sessionKey);

        let fieldIdToNameMap = {}; 
        this.state.formData.fields.forEach((field) => {
            fieldIdToNameMap[field.id] = field.label;
        });

        let submissionCompiler = new FormSubmissionCompiler(fieldIdToNameMap);

        formRefs.submitBtn.setAttribute("disabled", "disabled");
        let submissionRequests = [];

        let hasSentEmail = false; // Flag to prevent email call being run more than once
        let redirectHandler = null;
        let redirectConfig = null;

        this.state.formData.submissionHandlers.forEach((handlerConfig) => {
            let handlerName = handlerConfig.name;
            if (handlerName === "Email") {
                if (hasSentEmail) {
                    return;
                }
                hasSentEmail = true;
            }

            let handlerClass = require('../submissionHandlers/' + handlerName).default;
            let handler = new handlerClass(this.proxyUrl, tessituraClient, this.clientName);
            handlerConfig.options['_formid'] = this.props.params.id;

            if (handlerName === "Redirect") {
                redirectHandler = handler;
                redirectConfig = handlerConfig;
            } else {
                let compiledData = submissionCompiler.compile(handlerConfig.options, this.state.formValues);
                submissionRequests.push(handler.handleSubmission(compiledData, handlerConfig.options, this.state.formValues))
            }
        });
        axios.all(submissionRequests).then((response) => {
            if (redirectHandler) {
                let compiledData = submissionCompiler.compile(redirectConfig.options, this.state.formValues);
                redirectHandler.handleSubmission(compiledData, redirectConfig.options, this.state.formValues);
            } else {
                formRefs.submitBtn.removeAttribute("disabled");
                this.setState({hasSubmitted: true});
            }
        });
    }

    handleFieldUpdate(fieldName, value) {
        this.setState((oldState) => {
            oldState.formValues[fieldName] = value;
        });
    }

    render() {
        let content = null;
        if (!this.state.hasSubmitted) {
            content = this.renderForm();
        } else {
            content = this.renderFormConfirmation();
        }

        let cssPrefix = this.appConfig['css-prefix'];
        return <div className={cssPrefix}>
                    <this.Header />
                    <div className="form-view">
                        {content}
                    </div>
                    <this.Footer />
                </div>
    }

    renderFormConfirmation() {

        let confirmationHeading = this.state.formData.confirmation_page_heading || "Submission Received";
        let confirmationBody = null;

        if (this.state.formData.confirmation_page_message) {
            confirmationBody = <p>{this.state.formData.confirmation_page_message}</p>;
        }

        return (
            <div>
                <h2>{this.state.formData.name}</h2>
                <div className="alert alert-success">{confirmationHeading}</div>
                {confirmationBody}
            </div>
        );
    }

    renderForm() {
        return (
            <FormRenderer 
                formData={this.state.formData} 
                availableFieldTypes={this.availableFieldTypes}
                onFormSubmit={this.handleFormSubmission}
                handleFieldUpdate={this.handleFieldUpdate}
                values={this.state.formValues}
                isReadOnly="false"
            />
        )
    }
}

export default ViewerMain;