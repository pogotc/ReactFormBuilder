import React from 'react';

import { Router, Route, browserHistory } from 'react-router'

let FormBuilder = require('../editor/containers/FormBuilder').default;
let ListForms = require('../editor/containers/ListForms').default;
let EditorMain = require('../editor/containers/EditorMain').default;
let ViewerMain = require('../viewer/ViewerMain').default;
let TNEWViewer = require('../viewer/TNEWViewer').default;

// @TODO Try and refactor this out somewhere else
let applicationConfig = {
    "forms.masseyhallroythomsonhall.com": {
        "proxyUrl": "https://tessituraproxy.site",
	    "client": "massapp",
	    "s3base": "https://s3-eu-west-1.amazonaws.com/made-dev/formbuilder",
		"tnew" : {
			"loginUrl": "https://tickets.masseyhallroythomsonhall.com/account/login.aspx"
		}
    }
};
let appConfig = {};
let appHostname = window.location.hostname;

for (let domain in applicationConfig) {
	if (appHostname === domain) {
		appConfig = applicationConfig[domain];
	}
}

var routes = (
	<Router history={browserHistory}>
		<Route path="/editor" component={EditorMain}>
			<Route path="edit/:id" component={FormBuilder} appConfig={appConfig}/>
			<Route path="list" component={ListForms}  appConfig={appConfig}/>
		</Route>
		<Route path="/view/:id" component={ViewerMain} appConfig={appConfig}/>
		<Route path="/tnew/:id" component={TNEWViewer} appConfig={appConfig}/>
	</Router>
);

module.exports = routes;