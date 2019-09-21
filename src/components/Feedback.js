import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {Link} from "react-router-dom";
import Popup from 'reactjs-popup';


class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            comment: '',
            submitResult: ''
        };
    }

    onChangeNameHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    };
    onChangeEmailHandler = (e) => {
        this.setState({
            email: e.target.value
        });
    };
    onChangePhoneHandler = (e) => {
        this.setState({
            phone: e.target.value
        });
    };
    onChangeCommentHandler = (e) => {
        this.setState({
            comment: e.target.value
        });
    };

    onSubmitHandler = (e) => {
        e.preventDefault();
        const name = this.state.name;
        const email = this.state.email;
        const phone = this.state.phone;
        const comment = this.state.comment;
        const feedbackData = {
            feedback: {
                name: name,
                email: email,
                phone: phone,
                comment: comment,
            }
        }
        axios.defaults.xsrfHeaderName = "X-CSRFToken";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.post('/api/feedback/', feedbackData)
            .then((data) => {
                this.setState({submitResult: data})
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({name: '', email: '', phone: '', comment: ''})
    }


    render() {
        const subRslt = this.state.submitResult.data;
        let subRsltText = "";
        if (subRslt != null) {
            subRsltText = String(subRslt.success);
            // const rsltDiv = document.createElement('p');
            // let rsltText = document.createTextNode(String(subRslt.success));
            // rsltDiv.appendChild(rsltText);
            // document.body.appendChild(rsltDiv);
        }
        console.log(subRsltText);
        return (
            <div class="container">
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link to="/" className="btn btn-outline-light">Back to Homepage</Link>
                    </nav>
                </header>
                <br/>
                <h3>Leave a Message to Mao</h3>
                <br/>

                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label For="exampleFormControlInput1">Name</label>
                        <input type="text" className="form-control" name="name" value={this.state.name}
                               onChange={this.onChangeNameHandler}
                               placeholder="John Snow"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Email</label>
                        <input type="email" className="form-control" name="email" value={this.state.email}
                               onChange={this.onChangeEmailHandler}
                               placeholder="john.snow@winterfall.got"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Phone</label>
                        <input type="text" className="form-control" name="phone" value={this.state.phone}
                               onChange={this.onChangePhoneHandler}
                               placeholder="123-456-7890"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Comment</label>
                        <textarea rows="3" type="text" className="form-control" name="comment"
                                  value={this.state.comment}
                                  onChange={this.onChangeCommentHandler}
                                  placeholder="What did Father use to say? Everything before the word ‘but’ is horse-shit."></textarea>
                    </div>
                    <Popup trigger={<button id="subBtn" className="btn btn-success" onClick={this.handleFeedbackSuccess}>Submit</button>} modal
                           closeOnDocumentClick>
                        <div id="SuccessMsg" className="alert alert-light" role="alert">
                            <h4 className="alert-heading">Thank you for your feedback!</h4>
                            <hr className="new1" />
                            <p>{subRsltText}</p>
                        </div>
                    </Popup>
                </form>
            </div>
        )
    }
}

export default Feedback;