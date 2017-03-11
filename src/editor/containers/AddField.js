import React, { Component } from 'react';

class AddField extends Component {

    fieldTypes = {};

    constructor(props) {
        super(props);
        
        this.props.availableFieldTypes.forEach((fieldType) => {
            let classObject = require("../components/FormElements/" + fieldType).default;
            this.fieldTypes[fieldType] = new classObject();
        });
        console.log(this.fieldTypes);
    }

    render() {
        let addButtons = this.props.availableFieldTypes.map((fieldTypeName, i) => {
            let fieldType = this.fieldTypes[fieldTypeName];
            let friendlyName = fieldType.getFriendlyName();
            let iconName = fieldType.getGlyphiconName();
            return <li key={i}>
                        <button className="btn btn-default" onClick={() => this.props.onFieldCreate(fieldTypeName)}>
                            <span className={"glyphicon " + iconName} aria-hidden="true"></span> {friendlyName}
                        </button>
                    </li>;
        });

        return (
            <div className={'control-panel-content ' + (!this.props.active ? 'hidden' :'')}>
                <ul className="add-field-list clearfix">
                    {addButtons}
                </ul>
            </div>
        )
    }

}

export default AddField;