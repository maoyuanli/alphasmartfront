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
        fetch('' +
            'http://localhost:8080/api/tweet/'
        )
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    tweets: data.tweets,
                })
            });
        console.log(this.state.tweets)
    }

    render() {
        const tweets = this.state.tweets.slice(0, 10);

        return (
            <div>
                <div className="tcontainer">
                    <div className="ticker-wrap">
                        <div className="ticker-move">
                            {tweets.map((tweet, index) => {
                                return (
                                    <div className="ticker-item">
                                        <div>
                                            <p>
                                                <img id="tweet_avatar" src={tweet.user.profileImageUrl} alt="Avatar"></img>
                                                <spam>@{tweet.user.screenName} : </spam>
                                                <span><a href={tweet.urlEntities.expandedURL}>{tweet.text}</a></span>
                                                <span>{tweet.createdAt}</span>
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
