import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {switchUrl} from "./utilities/utils";

class Tweet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
        }
    };


    componentDidMount() {
        fetch(
            switchUrl('spring','tweet')
        )
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    tweets: data.tweets,
                })
            });
    }

    render() {
        const tweets = this.state.tweets.slice(0, 30);

        return (
            <div>
                <div className="tcontainer">
                    <div className="ticker-wrap">
                        <div className="ticker-move">
                            {tweets.map((tweet, index) => {
                                return (
                                    <div key={index} className="ticker-item">
                                        <div>
                                            <p >
                                                <img id="tweet_avatar" src={tweet.user.profileImageUrlHttps} alt="Avatar"></img>
                                                <span>@{tweet.user.screenName} : </span>
                                                <span> {tweet.text.split('https')[0]} </span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tweet;
