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

    getAttributesFromProps() {
        var attrs = {};
        if (this.props.isReadOnly === "true") {
            attrs['readOnly'] = 'readOnly';
            attrs['disabled'] = 'disabled';
        }
        if (this.props.handleFieldUpdate) {
            attrs['onChange'] = (e) => {
                this.props.handleFieldUpdate(this.props.label, e.target.value);
            }
        }
        attrs['value'] = this.props.value || "";
        return attrs;
    }

    getHelpText() {
        if (this.props.help) {
            return <span className="help-block">{this.props.help}</span>;
        }
        return null;
    }

    getFriendlyName() {
        return "To Be Implemented";
    }

    getGlyphiconName() {
        return "glyphicon-font";
    }

    render() {
        return (
            <p>Abstract</p>
        )
    }
};

let fieldOptions = null;

export {fieldOptions};

export default FormComponent;