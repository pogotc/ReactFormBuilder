import React, { Component } from 'react';
import FormManager from '../editor/lib/FormManager';
import FormRenderer from '../editor/containers/FormRenderer';

class ViewerMain extends Component {

    availableFieldTypes = ["TextField", "TextArea", "Select"];
    formManager;

    constructor(props) {
        super(props);
        this.state = {
            formData: {name: "", fields:[]},
            formValues: {}
        };

        this.formManager = new FormManager("https://tessituraproxy.site/formbuilder/made1");

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

    handleFormSubmission(e) {
        e.preventDefault();
        console.log(this.state.formValues);
    }

    handleFieldUpdate(fieldName, value) {
        this.setState((oldState) => {
            oldState.formValues[fieldName] = value;
        });
    }

    render() {
        return (
            <div>
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