import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";

class SharedNavBar extends Component {
    render() {
        const gblinks = this.props.goBackLinks;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    {gblinks.map((link, index) => {
                        return (
                            <Link key={index} to={link.address} className="btn btn-outline-light">{link.text}</Link>
                        )
                    })}

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
