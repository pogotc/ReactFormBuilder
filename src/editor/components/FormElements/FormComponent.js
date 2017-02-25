import React, { Component } from 'react';

class FormComponent extends Component {

    constructor(props) {
        super(props);
        this.handleFieldClick = this.handleFieldClick.bind(this);
    }

    handleFieldClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.id);
        }
    }

    render() {
        return (
            <p>Abstract</p>
        )
    }
};

export default FormComponent;