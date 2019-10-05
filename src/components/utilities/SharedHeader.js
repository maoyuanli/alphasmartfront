import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'

class SharedHeader extends Component {
    render() {
       return ( <div>
        <section className="jumbotron text-center">
            <div className="container">
                <h3 className="jumbotron-heading">{this.props.text}</h3>
            </div>
        </section>
        </div>)
    }
};


export default SharedHeader;
