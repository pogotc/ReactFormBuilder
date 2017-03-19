import axios from 'axios';

import React, { Component } from 'react';
import ViewerMain from './ViewerMain';

class TNEWViewer extends Component {

    proxyUrl;
    loginUrl;;

    constructor(props) {
        super(props);
        this.state = {
            sessionKey: ""
        }
        
        let clientName = props.route.appConfig.client;
        let tnewConfig = props.route.appConfig.tnew;
        this.proxyUrl = props.route.appConfig.proxyUrl + "/tnew/" + clientName;
        let returnUrl = window.location.href;
        this.loginUrl = tnewConfig.loginUrl + "?ReturnUrl=" + returnUrl;

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
        if (!this.state.sessionKey) {
            return null;
        }

        return <ViewerMain {...this.props} sessionKey={this.state.sessionKey} />;
    }
}


export default TNEWViewer;