import axios from 'axios';

import React, { Component } from 'react';
import ViewerMain from './ViewerMain';
// import Tessitura from '../lib/Tessitura';

class TNEWViewer extends Component {

    proxyUrl;
    loginUrl;;

    constructor(props) {
        super(props);
        this.state = {
            sessionKey: ""
        }

        //@TODO Config items to refactor
        this.proxyUrl = "https://tessituraproxy.site/tnew/massapp?GetTNEWAnonymousSession";
        let returnUrl = "http://forms.masseyhallroythomsonhall.com:3000/tnew/3823280";
        this.loginUrl = "https://tickets.masseyhallroythomsonhall.com/account/login.aspx?ReturnUrl=" + returnUrl;

        this.fetchSessionKeyForUser = this.fetchSessionKeyForUser.bind(this);

        let rawCookies = document.cookie.split(";");
        let tnewCookieVal;
        rawCookies.forEach((cookie) => {
            let matches = cookie.match(/TNEW=(.*)/);
            if (matches && matches.length) {
                tnewCookieVal = matches[1];
            }
         });
         if (tnewCookieVal) {
            this.fetchSessionKeyForUser(tnewCookieVal);
         } else {
             window.location = this.loginUrl;
         }
    }

    fetchSessionKeyForUser(cookieVal) {
        var payload = {
            "method": "GetSessionKeyOrNewAnonymousSession",
	        "params": {
                'cookie': "TNEW=" + cookieVal
            },
	        "id": null
        };
        axios.post(this.proxyUrl, payload)
        .then((response) => {
            this.setState({
                sessionKey: response.data.result
            });
        });
    }

    render () {
        return <ViewerMain {...this.props} sessionKey={this.state.sessionKey} />;
    }
}


export default TNEWViewer;