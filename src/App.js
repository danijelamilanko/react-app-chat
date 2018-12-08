import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import Chat from './containers/Chat/Chat';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Chat/>
                </Layout>
            </div>
        );
    }
}

export default App;
