import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";

class SharedNavBar extends Component {
    render() {
        const show = this.props.showFeedback;
        function showFeedback() {
            if (show ===true) {
                return <Link to="/feedback" className="nav-item nav-link">Feedback</Link>;
            }
        }

        const gblinks = this.props.goBackLinks;
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-light" id={"sharedNavBar"}>
                    {gblinks.map((link, index) => {
                        return (
                            <Link key={index} to={link.address} className="nav-item nav-link" id={"leftLinks"}>{link.text}</Link>
                        )
                    })}

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            <a className="nav-item nav-link" href="https://github.com/maoyuanli/">Other Projects</a>
                            {showFeedback()}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default SharedNavBar
