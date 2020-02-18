import React, {Component} from 'react';
import './App.css';
import Homepage from './components/Homepage';
import Searchnews from './components/Searchnews';
import Feedback from "./components/Feedback";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Quote from "./components/Quote";

class App extends Component {

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Homepage}/>
                        <Route exact path="/searchnews" component={Searchnews}/>
                        <Route exact path="/feedback" component={Feedback}/>
                        <Route exact path="/quote" component={Quote}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}


export default App;
