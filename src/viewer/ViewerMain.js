import React, { Component } from 'react';

import FormRenderer from '../editor/containers/FormRenderer';

class ViewerMain extends Component {

    availableFieldTypes = ["TextField", "TextArea"];

    constructor(props) {
        super(props);
        this.state = {
            formData: []
        };
    }

    componentDidMount() {
        this.setState({
			formData: [
				{id: "1", type: "TextField", label: "Name"},
				{id: "2", type: "TextField", label: "Email"},
				{id: "3", type: "TextField", label: "Age"},
				{id: "4", type: "TextArea", label: "Comments"}
			]
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
                />
            </div>
        )
    }
}

export default ViewerMain;