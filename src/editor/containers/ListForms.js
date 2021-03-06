import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import FormManager from '../lib/FormManager';
import axios from 'axios';

class ListForms extends Component {

    formManager;

    constructor(props) {
        super(props);

        let appConfig = props.route.appConfig;
        let proxyUrl = appConfig.proxyUrl;
        let client = appConfig.client;        
        this.formManager = new FormManager(proxyUrl + "/formbuilder/" + client, appConfig.s3base, client);

        this.state = {
            forms: []
        };

        this.createForm = this.createForm.bind(this);
    }

    componentDidMount() {
        this.formManager.fetchAll()
            .then(axios.spread((...responses) => {
                let forms = responses.map((response) => {
                    return {
                        id: this.formManager.parseIdFromUrl(response.request.responseURL),
                        formData: response.data
                    }
                });
                this.setState({
                    forms: forms
                });
            }));
    }
    
    createForm() {
        this.formManager.createNewForm()
            .then((response) => {
                let newFormId = response.data.id;
                browserHistory.push("/editor/edit/" + newFormId);
            });
    }

    render() {

        let formElems = this.state.forms.map((form) => {
            return <tr key={form.id}>
                        <td>{form.formData.name}</td>
                        <td><Link to={'/view/' + form.id} target="_blank">View</Link></td>
                        <td><Link to={'/editor/edit/' + form.id}>Edit</Link></td>
                    </tr>
        });

        return (
            <div>
                <button className="btn btn-default pull-right" onClick={this.createForm}>Create Form</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formElems}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListForms;