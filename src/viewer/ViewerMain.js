import React, { Component } from 'react';
import FormManager from '../editor/lib/FormManager';
import FormRenderer from '../editor/containers/FormRenderer';

class ViewerMain extends Component {

    availableFieldTypes = ["TextField", "TextArea", "Select"];
    formManager;

    constructor(props) {
        super(props);
        this.state = {
            formData: {name: "", fields:[]}
        };

        this.formManager = new FormManager("https://tessituraproxy.site/formbuilder/made1");
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

    handleFormSubmission() {

    }

    render() {
        return (
            <div>
                <FormRenderer 
                    formData={this.state.formData} 
                    availableFieldTypes={this.availableFieldTypes}
                    onFormSubmit={this.handleFormSubmission}
                    isReadOnly="false"
                />
            </div>
        )
    }
}

export default ViewerMain;