import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import StreamCreate from './stream/StreamCreate';
import StreamDelete from './stream/StreamDelete';
import StreamEdit from './stream/StreamEdit';
import StreamList from './stream/StreamList';
import StreamShow from './stream/StreamShow';
import history from '../history';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path='/' exact component={StreamList} />
                    <Route path='/stream/new' exact component={StreamCreate} />
                    <Route path='/stream/edit/:id' exact component={StreamEdit} />
                    <Route path='/stream/delete/:id' exact component={StreamDelete} />
                    <Route path='/stream/:id' exact component={StreamShow} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;