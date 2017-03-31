import React, { Component } from 'react';
import { Link } from 'react-router'
import FormRenderer from './FormRenderer';
import ControlPanel from './ControlPanel';
import SubmissionRules from './SubmissionRules';
import FormManager from '../lib/FormManager';
import '../../index.css';
import '../../App.css';

class FormBuilder extends Component {

    availableFieldTypes = ["TextField", "TextArea", "Select"];
    formManager;

    constructor(props) {
        super(props);
        this.state = {
            formData: [{name: "", fields: []}],
            activeControlPanelTab: "AddField",
            fieldBeingEdited: {label: ""},
            isSaving: false,
            showSubmissionRulesPanel: false,
            referenceData: {}
        }
        
        let appConfig = props.route.appConfig;
        let proxyUrl = appConfig.proxyUrl;
        let client = appConfig.client;        
        this.formManager = new FormManager(proxyUrl + "/formbuilder/" + client, appConfig.s3base, client);
        this.formManager.getReferenceData()
        .then((response) => {
            this.setState((state) => {
                state.referenceData = response.data.result;
            });
        });


        this.markFieldAsBeingEdited = this.markFieldAsBeingEdited.bind(this);
        this.startEditingElement = this.startEditingElement.bind(this);
        this.startEditingFormName = this.startEditingFormName.bind(this);
        this.selectControlPanelTab = this.selectControlPanelTab.bind(this);
        this.updateFormDataField = this.updateFormDataField.bind(this);
        this.createNewFieldOfType = this.createNewFieldOfType.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.handleFormSettingUpdate = this.handleFormSettingUpdate.bind(this);
        this.deselectAllFields = this.deselectAllFields.bind(this);
        this.handleMoveField = this.handleMoveField.bind(this);
        this.deleteField = this.deleteField.bind(this);
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

    saveForm() {
        this.setState({isSaving: true});
        this.formManager.save(this.props.params.id, this.state.formData)
            .then((response) => {
                this.setState({isSaving: false});
            })
            .catch((err) => {
                this.setState({isSaving: false});
                console.log(err);
            });
    }

    updateFieldsState(newFieldData) {
        let newFormData = this.state.formData;
        newFormData.fields = newFieldData;
        this.setState({
            formData: newFormData,
        });
    }

    markFieldAsBeingEdited(elementId) {
        var fieldBeingEdited = undefined;
        var newFieldData = this.state.formData.fields.map((fieldData) => {
            fieldData.isSelected = fieldData.id === elementId;
            if (fieldData.id === elementId) {
                fieldBeingEdited = fieldData;
            }

            return fieldData;
        });
        this.updateFieldsState(newFieldData);

        this.setState({
            fieldBeingEdited: fieldBeingEdited
        });
    }

    startEditingElement(elementId) {
        this.markFieldAsBeingEdited(elementId);
        this.setState({
            activeControlPanelTab: "EditField"
        });
    }

    startEditingFormName() {
        this.deselectAllFields();
        this.setState({
            activeControlPanelTab: "FormSettings"
        });
    }

    deselectAllFields() {
        var newFieldData = this.state.formData.fields.map((fieldData) => {
            fieldData.isSelected = false;
            return fieldData;
        });
        this.updateFieldsState(newFieldData);
    }

    selectControlPanelTab(tabName) {
        if (tabName !== "EditField") {
            this.deselectAllFields();
        } else {
            if (this.state.formData.fields.length) {
                this.markFieldAsBeingEdited(this.state.formData.fields[0].id);
            }
        }

        this.setState({
            activeControlPanelTab: tabName
        });
    }

    updateFormDataField(newFieldData) {
        var newFormFieldData = this.state.formData.fields.map((fieldData) => {
            return newFieldData.id === fieldData.id ? newFieldData : fieldData;
        });
        this.updateFieldsState(newFormFieldData);
    }

    deleteField() {
        this.setState((state) => {
            state.formData.fields = state.formData.fields.filter((field) => {
                return field.id !== state.fieldBeingEdited.id;
            });
        });
    }

    handleFormSettingUpdate(settingName, newValue) {
        this.setState((state) => {
            state.formData[settingName] = newValue;
        });
    }

    handleMoveField(dragIndex, hoverIndex) {
        if (dragIndex === undefined || hoverIndex === undefined) {
            return;
        }

        this.setState((state) => {
            let fields = state.formData.fields;
            let tmp = fields[hoverIndex];
            fields[hoverIndex] = fields[dragIndex];
            fields[dragIndex] = tmp;
            state.formData.fields = fields;
        });
    }

    createNewFieldOfType(fieldType) {
        let newField = {
            label: 'Untitled',
            type: fieldType,
            id: Math.floor(Math.random() * 10000),
            options: {}
        };
        let newFieldData = this.state.formData.fields;
        newFieldData.push(newField);

        this.updateFieldsState(newFieldData);
    }

    render() {
        return (
            <div className="formbuilder">
                <div className="form-header">
                    <div className="pull-right">
                        <button className="btn btn-default" onClick={() => this.setState({showSubmissionRulesPanel: true})}>Submission Rules</button>
                        <button className="btn btn-default">Embed</button>
                        <button className="btn btn-primary" onClick={this.saveForm}>{this.state.isSaving ? "Saving" : "Save"}</button>
                    </div>
                    <p>
                        <Link to="/editor/list">
                            <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Back to all forms
                        </Link>
                    </p>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <ControlPanel 
                            activeTab={this.state.activeControlPanelTab} 
                            onTabClick={this.selectControlPanelTab}
                            fieldBeingEdited={this.state.fieldBeingEdited}
                            availableFieldTypes={this.availableFieldTypes}
                            onFieldUpdate={this.updateFormDataField}
                            onFieldCreate={this.createNewFieldOfType}
                            onFieldDelete={this.deleteField}
                            formData={this.state.formData}
                            handleFormSettingUpdate={this.handleFormSettingUpdate}
                        />
                    </div>
                    <div className="col-md-8 form-preview">
                        <FormRenderer 
                            formData={this.state.formData} 
                            handleMoveField={this.handleMoveField}
                            selectFieldHandler={this.startEditingElement} 
                            selectFormNameHandler={this.startEditingFormName}
                            availableFieldTypes={this.availableFieldTypes}
                            selectFormName={this.state.activeControlPanelTab === 'FormSettings'}
                            isReadOnly="true"
                        />
                        <div className={this.state.formData.fields && this.state.formData.fields.length > 0 ? "hidden" : ""}>
                            <button className="btn btn-primary" onClick={() => this.selectControlPanelTab('AddField')}>Add new field</button>
                        </div>
                    </div>
                    <SubmissionRules 
                        enabled={this.state.showSubmissionRulesPanel} 
                        formData={this.state.formData}
                        referenceData={this.state.referenceData}
                        onClose={() => this.setState({showSubmissionRulesPanel: false})}
                        onSubmissionRuleUpdate={(updatedRules) => {
                            this.handleFormSettingUpdate("submissionHandlers", updatedRules)
                        }}
                        />
                </div>
            </div>
        )
    }
}

export default FormBuilder;