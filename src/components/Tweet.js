import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';


class Tweet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
        }
    };


    componentDidMount() {
        fetch(
            'https://alphaspring.herokuapp.com/api/tweet/'
            // 'http://localhost:8080/api/tweet/'
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
                                                <span> {tweet.text} </span>
                                                <span> | {tweet.createdAt} </span>
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
