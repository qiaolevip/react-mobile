import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import App from './pages/app.jsx';
import Home from './pages/home.jsx';

import NotFound from './pages/notFound.jsx';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const routes = (
	<Router history={appHistory}>
		<Route path="/" component={ App }>
			<IndexRoute component={ Home } />
			<Route path="*" component={ NotFound } />
		</Route>
	</Router>
);

export default routes;