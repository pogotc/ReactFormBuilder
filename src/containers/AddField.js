import React, { Component } from 'react';

class AddField extends Component {

    render() {
        let addButtons = this.props.availableFieldTypes.map((fieldType, i) => {
            return <li key={i}><button className="btn btn-default" onClick={() => this.props.onFieldCreate(fieldType)}>{fieldType}</button></li>;
        });

        return (
            <div className={!this.props.active ? 'hidden' :''}>
                <ul>
                    {addButtons}
                </ul>
            </div>
        )
    }

}

export default AddField;