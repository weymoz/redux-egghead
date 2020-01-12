import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import configureStore from './reducer'
import TodoApp from './TodoApp'

import '../style.css'

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router>
            <Route exact path="/:filter?" component={TodoApp} />
        </Router>
    </Provider>
    , document.getElementById('root'))