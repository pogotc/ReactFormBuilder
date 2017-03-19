import React, { Component } from 'react';

class EditorMain extends Component {

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="navbar-header">
                        <a className="navbar-brand">FormBuilder</a>
                    </div>
                </nav>
                {this.props.children}

                <footer className="footer">
                    <p>&copy; Made Media</p>
                </footer>
            </div>
        )
    }
}

export default EditorMain;