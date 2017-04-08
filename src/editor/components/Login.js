import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Auth from '../Auth';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            hasFailedLogin: false,
            loginBtnLabel: "Login"
        }
        this.onFieldUpdate = this.onFieldUpdate.bind(this);
        this.login = this.login.bind(this);
    }

    onFieldUpdate(field, value) {
        this.setState((state) => {
            state[field] = value;
        })
    }

    login() {
        this.setState((state) => {
            state.loginBtnLabel = "Checking...";
            state.hasFailedLogin = false;
        });
        Auth.authenticate(this.state.username, this.state.password, (success) => {
            if (success) {
                browserHistory.push('/editor/list');
            } else {
                this.setState((state) => {
                    state.hasFailedLogin = true;
                    state.loginBtnLabel = "Login";
                })
            }
        });
    }

    render() {
        let error = null;
        if (this.state.hasFailedLogin) {
            error = <div className="alert alert-warning">Invalid username / password</div>;
        }

        return (
            <div className="container">
                <form className="login-form">
                    {error}
                    <div className="form-group">
                        <label>Username</label>
                        <input  type="text" 
                                className="form-control" 
                                value={this.state.username} 
                                onChange={(e) => this.onFieldUpdate("username", e.target.value)} 
                                />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input  type="password" 
                                className="form-control" 
                                value={this.state.password}
                                onChange={(e) => this.onFieldUpdate("password", e.target.value)} 
                                />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.login}>{this.state.loginBtnLabel}</button>
                </form>




                

                <footer className="footer">
                    <p>&copy; Made Media</p>
                </footer>
            </div>
        )
    }
}

export default Login;