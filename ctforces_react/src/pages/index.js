import React from 'react';

import { Switch, BrowserRouter as Router } from 'react-router-dom';
import IndexPage from './index/Container';
import LoginPage from './login/Container';
import RegisterPage from './register/Container';
import UsersPage from './users';
import PostsPage from './posts';
import TasksPage from './tasks';
import ContestsPage from './contests';

import { PublicRoute } from '../lib/Routes';

const App = () => (
    <Router>
        <Switch>
            <PublicRoute exact path="/" component={IndexPage} />
            <PublicRoute exact path="/login/" component={LoginPage} />
            <PublicRoute exact path="/register/" component={RegisterPage} />
            <PublicRoute path="/users/" component={UsersPage} />
            <PublicRoute path="/posts/" component={PostsPage} />
            <PublicRoute path="/tasks/" component={TasksPage} />
            <PublicRoute path="/contests/" component={ContestsPage} />
        </Switch>
    </Router>
);

export default App;
