import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Chat from './containers/Chat/Chat';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

import SocketContext from './socket-context';
import * as io from 'socket.io-client';

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

const socket = io(process.env.API_BASE_URL, {
    secure: true,
    rejectUnauthorized: false,
    path: 'chat/socket.io'
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" exact component={Home}/>
                <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={asyncAuth}/>
                    <Route path="/" exact component={Home}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }

        return (
            <SocketContext.Provider value={socket}>
                <div id="main">
                    <Layout>
                        {routes}
                    </Layout>
                </div>
            </SocketContext.Provider>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
