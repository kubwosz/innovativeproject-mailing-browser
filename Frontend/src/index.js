import React from 'react';
import {render} from 'react-dom';
import './index.css';
import Home from './components/Home';
import {BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import MailList from "./components/MailList";
import Mail from "./components/Mail";


class App extends React.Component{
    render() {
        return (
            <Router>
                <div>
                    <Home>
                        <Switch>
                            <Route exact path="/" component={MailList}/>
                            <Route path="/mail/:id" component={Mail} />
                            <Route path="/mail" component={Mail} />
                        </Switch>
                    </Home>
                </div>
            </Router>
        )
    }
}

render(<App />, window.document.getElementById('root'));
//registerServiceWorker();
