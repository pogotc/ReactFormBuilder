import React, { Component } from 'react';

class AddField extends Component {

    render() {
        return (
            <div className={!this.props.active ? 'hidden' :''}>
                Add a field
            </div>
        )
    }

}

export default AddField;