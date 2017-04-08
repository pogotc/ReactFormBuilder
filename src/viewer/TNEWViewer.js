import axios from 'axios';

import React, { Component } from 'react';
import ViewerMain from './ViewerMain';

class TNEWViewer extends Component {

    proxyUrl;
    loginUrl;
    cookieDomain;

    constructor(props) {
        super(props);
        this.state = {
            sessionKey: ""
        }
        
        let clientName = props.route.appConfig.client;
        let tnewConfig = props.route.appConfig.tnew;
        this.proxyUrl = props.route.appConfig.proxyUrl + "/tnew/" + clientName;
        this.cookieDomain = tnewConfig.cookieDomain;

        let returnUrl = window.location.href;
        this.loginUrl = tnewConfig.loginUrl + "?ReturnUrl=" + returnUrl;
        this.fetchSessionKeyForUser = this.fetchSessionKeyForUser.bind(this);
        this.createNewTNEWSession = this.createNewTNEWSession.bind(this);

        let rawCookies = document.cookie.split(";");
        let tnewCookieVal;
        rawCookies.forEach((cookie) => {
            let matches = cookie.match(/TNEW=(.*)/);
            if (matches && matches.length) {
                tnewCookieVal = matches[1];
            }
         });

         let mustBeLoggedIn = false;

         if (tnewCookieVal) {
             this.fetchSessionKeyForUser(tnewCookieVal);
         } else {
            if (mustBeLoggedIn) {
                window.location = this.loginUrl;
            } else {
                this.createNewTNEWSession();
            } 
         }
    }

    createNewTNEWSession() {
        var payload = {
            "method": "GetTNEWAnonymousSession",
	        "params": {
                "returnCookie": true
            },
	        "id": null
        };
        axios.post(this.proxyUrl, payload)
        .then((response) => {
            let result = response.data.result;
            this.setState({
                sessionKey: result.sessionKey
            });
            this.createCookie("TNEW", result.cookie);
        });
    }

    createCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/; domain=" + this.cookieDomain;
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
        console.log(this.state.sessionKey);
        return <ViewerMain {...this.props} sessionKey={this.state.sessionKey} />;
    }
}


export default TNEWViewer;