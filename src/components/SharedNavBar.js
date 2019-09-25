import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";

class SharedNavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to={this.props.goBackLink} className="btn btn-outline-light">{this.props.goBackText}</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            <a className="nav-item nav-link" href="https://github.com/maoyuanli/">GitHub</a>
                            <Link to="/feedback" className="btn btn-outline-warning">Feedback</Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default SharedNavBar
