import React, { Component } from 'react';

class FormSettings extends Component {

    render() {
        return (
            <div className={!this.props.active ? 'hidden' :''}>
                Form Settings
            </div>
        )
    }

}

export default FormSettings;