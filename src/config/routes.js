import React from 'react';

import { Router, Route, browserHistory } from 'react-router'

let FormBuilder = require('../editor/containers/FormBuilder').default;
let ListForms = require('../editor/containers/ListForms').default;
let EditorMain = require('../editor/containers/EditorMain').default;
let ViewerMain = require('../viewer/ViewerMain').default;

let appConfig = {
	proxyUrl: "https://tessituraproxy.site",
	client: "made1",
	s3base: "https://s3-eu-west-1.amazonaws.com/made-dev/formbuilder"
}

var routes = (
	<Router history={browserHistory}>
		<Route path="/editor" component={EditorMain}>
			<Route path="edit/:id" component={FormBuilder} appConfig={appConfig}/>
			<Route path="list" component={ListForms}  appConfig={appConfig}/>
		</Route>
		<Route path="/view/:id" component={ViewerMain} appConfig={appConfig}/>
	</Router>
);

module.exports = routes;