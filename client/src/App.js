import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css'

import ChatContainer from './containers/ChatContainer/ChatContainer'
import LoginContainer from './containers/LoginContainer/LoginContainer'
import RegisterContainer from './containers/RegisterContainer/RegisterContainer'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/login" exact component={LoginContainer} />
                        <Route
                            path="/register"
                            exact
                            component={RegisterContainer}
                        />
                        <Route path="/" component={ChatContainer} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
