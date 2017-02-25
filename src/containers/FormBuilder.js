import React, { Component } from 'react';

import FormRenderer from './FormRenderer';
import ControlPanel from './ControlPanel';

class FormBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: [],
            activeControlPanelTab: "AddField",
            fieldBeingEdited: {label: ""}
        }
        this.startEditingElement = this.startEditingElement.bind(this);
        this.selectControlPanelTab = this.selectControlPanelTab.bind(this);
        this.updateFormDataField = this.updateFormDataField.bind(this);
    }

    componentDidMount() {
        this.setState({
			formData: [
				{id: "1", name: "TextField", label: "Name"},
				{id: "2", name: "TextField", label: "Email"},
				{id: "3", name: "TextField", label: "Age"},
				{id: "4", name: "TextArea",  label: "Comments"}
			]
		});
    }

    startEditingElement(elementId) {
        var fieldBeingEdited = undefined;
        var newFormData = this.state.formData.map((fieldData) => {
            fieldData.isSelected = fieldData.id === elementId;
            if (fieldData.id === elementId) {
                fieldBeingEdited = fieldData;
            }

            return fieldData;
        });



        this.setState({
            formData: newFormData,
            fieldBeingEdited: fieldBeingEdited
        });
        this.selectControlPanelTab("EditField");
    }

    selectControlPanelTab(tabName) {
        if (tabName !== "EditField") {
            var newFormData = this.state.formData.map((fieldData) => {
                fieldData.isSelected = false;
                return fieldData;
            });
            this.setState({
                formData: newFormData,
            });
        }

        this.setState({
            activeControlPanelTab: tabName
        });
    }

    updateFormDataField(newFieldData) {
        var newFormData = this.state.formData.map((fieldData) => {
            return newFieldData.id == fieldData.id ? newFieldData : fieldData;
        });
        this.setState({
            formData: newFormData,
        });
    }

    render() {
        return (
            <div className="formbuilder">
                <div className="form-header">
                    <div className="pull-right">
                        <button className="btn btn-default">Submission Rules</button>
                        <button className="btn btn-default">Embed</button>
                        <button className="btn btn-primary">Save</button>
                    </div>

                    <h2>Name of form</h2>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <ControlPanel 
                            activeTab={this.state.activeControlPanelTab} 
                            onTabClick={this.selectControlPanelTab}
                            fieldBeingEdited={this.state.fieldBeingEdited}
                            onFieldUpdate={this.updateFormDataField}
                        />
                    </div>
                    <div className="col-md-8">
                        <FormRenderer formData={this.state.formData} selectFieldHandler={this.startEditingElement} />
                        <div>
                            <button className="btn btn-primary">Add new field</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormBuilder;