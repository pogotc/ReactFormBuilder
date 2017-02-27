import React, { Component } from 'react';

import FormRenderer from './FormRenderer';
import ControlPanel from './ControlPanel';
import FormManager from '../lib/FormManager';
import '../../index.css';
import '../../App.css';

class FormBuilder extends Component {

    availableFieldTypes = ["TextField", "TextArea"];
    formManager;

    constructor(props) {
        super(props);
        this.state = {
            formData: [{name: "", fields: []}],
            activeControlPanelTab: "AddField",
            fieldBeingEdited: {label: ""},
            isSaving: false
        }

        this.formManager = new FormManager("https://tessituraproxy.site/formbuilder/made1");

        this.markFieldAsBeingEdited = this.markFieldAsBeingEdited.bind(this);
        this.startEditingElement = this.startEditingElement.bind(this);
        this.startEditingFormName = this.startEditingFormName.bind(this);
        this.selectControlPanelTab = this.selectControlPanelTab.bind(this);
        this.updateFormDataField = this.updateFormDataField.bind(this);
        this.createNewFieldOfType = this.createNewFieldOfType.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.updateFormName = this.updateFormName.bind(this);
        this.deselectAllFields = this.deselectAllFields.bind(this);
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

    updateFormName(e) {
        let formData = this.state.formData;
        formData.name = e.target.value;
        this.setState({
            formData: formData
        });
    }

    createNewFieldOfType(fieldType) {
        let newField = {
            label: 'Untitled',
            type: fieldType,
            id: Math.floor(Math.random() * 10000)
        };
        let newFieldData = this.state.formData.fields;
        newFieldData.push(newField);

        this.updateFieldsState(newFieldData);
    }

    render() {
        return (
            <div className="formbuilder">
                <div className="row form-header">
                    <div className="pull-right">
                        <button className="btn btn-default">Submission Rules</button>
                        <button className="btn btn-default">Embed</button>
                        <button className="btn btn-primary" onClick={this.saveForm}>{this.state.isSaving ? "Saving" : "Save"}</button>
                    </div>
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
                            formData={this.state.formData}
                            onFormNameUpdate={this.updateFormName}
                        />
                    </div>
                    <div className="col-md-8">
                        <FormRenderer 
                            formData={this.state.formData} 
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
                </div>
            </div>
        )
    }
}

export default FormBuilder;