import React, { Component } from 'react';

class AddField extends Component {

    render() {
        let addButtons = this.props.availableFieldTypes.map((fieldType, i) => {
            return <li key={i}>
                        <button className="btn btn-default" onClick={() => this.props.onFieldCreate(fieldType)}>
                            <span className="glyphicon glyphicon-font" aria-hidden="true"></span> {fieldType}
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