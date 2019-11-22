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
        const tweets = this.state.tweets.slice(0,10);

        return (
            <div>
                <h5 align="center" className="senti_score_prefix">What the market is talking about</h5>
                <div className="tcontainer">
                    <div className="ticker-wrap">
                        <div className="ticker-move">
                    {tweets.map((tweet, index) => {
                        return (
                            <div className="ticker-item">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">@{tweet.user.screenName}</h5>
                                        <a>{tweet.createdAt}</a>
                                        <p className="card-text"><a href={tweet.urlEntities.url}>{tweet.text}</a></p>
                                    </div>
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
