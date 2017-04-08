import React from 'react';

import { Router, Route, browserHistory } from 'react-router'

let FormBuilder = require('../editor/containers/FormBuilder').default;
let ListForms = require('../editor/containers/ListForms').default;
let EditorMain = require('../editor/containers/EditorMain').default;
let ViewerMain = require('../viewer/ViewerMain').default;
let TNEWViewer = require('../viewer/TNEWViewer').default;
let Login = require('../editor/components/Login').default;
let Auth = require('../editor/Auth').default;

// @TODO Try and refactor this out somewhere else
let applicationConfig = {
    "forms.masseyhallroythomsonhall.com": {
        "proxyUrl": "https://formbuilder-proxy.devspace.net",
	    "client": "massapp",
	    "s3base": "https://s3-eu-west-1.amazonaws.com/made-dev/formbuilder",
		"css-prefix": "theme-massey",
		"tnew" : {
			"loginUrl": "https://tickets.masseyhallroythomsonhall.com/account/login.aspx",
			"cookieDomain": ".masseyhallroythomsonhall.com"
		}
    },
	"forms.blocksoffice.devspace.net": {
        "proxyUrl": "https://formbuilder-proxy.devspace.net",
	    "client": "made1",
	    "s3base": "https://s3-eu-west-1.amazonaws.com/made-dev/formbuilder",
		"css-prefix": "container"
    }
};
let appConfig = {};
let appHostname = window.location.hostname;

for (let domain in applicationConfig) {
	if (appHostname === domain) {
		appConfig = applicationConfig[domain];
	}
}
Auth.init(appConfig.proxyUrl + "/formbuilder/" + appConfig.client, appConfig.cookieDomain);

var routes = (
	<Router history={browserHistory}>
		<Route path="/editor" component={EditorMain} onEnter={Auth.validateOnEnter}>
			<Route path="edit/:id" component={FormBuilder} appConfig={appConfig}/>
			<Route path="list" component={ListForms}  appConfig={appConfig}/>
		</Route>
		<Route path="/login" component={Login} appConfig={appConfig}/>
		<Route path="/view/:id" component={ViewerMain} appConfig={appConfig}/>
		<Route path="/tnew/:id" component={TNEWViewer} appConfig={appConfig}/>
	</Router>
);

module.exports = routes;