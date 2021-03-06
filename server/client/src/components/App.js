import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header.js';
import Landing from './Landing.js';
import Dashboard from './Dashboard.js';
import SurveyNew from './surveys/SurveyNew.js';
import Footer from './Footer.js';
import 'materialize-css/dist/css/materialize.min.css';


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                <div>
                    <header>
                    <Header />
                    </header>
                    <main>
                    <Route exact path = "/" component={Landing} />
                    <Route exact path = "/surveys" component={Dashboard} />
                    <Route exact path = "/surveys/new" component={SurveyNew} />
                    </main>
                    <Footer />
                </div>
                </BrowserRouter>
            </div>
        );
    };
};

export default connect(null, actions)(App);