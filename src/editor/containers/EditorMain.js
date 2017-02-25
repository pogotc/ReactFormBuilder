import React, { Component } from 'react';

class EditorMain extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="navbar-header">
                        <a className="navbar-brand">FormBuilder</a>
                    </div>
                </nav>
                {this.props.children}
            </div>
        )
    }
}

export default EditorMain;