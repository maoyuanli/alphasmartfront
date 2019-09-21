import React, {Component} from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Searchnews from './components/Searchnews';
import Feedback from "./components/Feedback";
import {BrowserRouter, Route, Switch} from 'react-router-dom'

class App extends Component {

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path="/feedback" component={Feedback} />
                        <Route path="/searchnews" component={Searchnews}/>
                        <Route path="/" component={Homepage}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}


export default App;
