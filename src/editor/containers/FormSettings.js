import React, { Component } from 'react';

class FormSettings extends Component {

    render() {
        return (
            <div className={'control-panel-content ' + (!this.props.active ? 'hidden' :'')}>
                Form Settings
            </div>
        )
    }

}

export default FormSettings;