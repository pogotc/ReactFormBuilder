import React from 'react';

import { Router, Route, browserHistory } from 'react-router'

let FormBuilder = require('../editor/containers/FormBuilder').default;
let ListForms = require('../editor/containers/ListForms').default;
let EditorMain = require('../editor/containers/EditorMain').default;
let ViewerMain = require('../viewer/ViewerMain').default;

var routes = (
	<Router history={browserHistory}>
        <Route path="/editor" component={EditorMain}>
		    <Route path="edit/:id" component={FormBuilder} />
            <Route path="list" component={ListForms} />
        </Route>
        <Route path="/view" component={ViewerMain} />
	</Router>
);

module.exports = routes;