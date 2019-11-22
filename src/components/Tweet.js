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
        const tweets = this.state.tweets;

        return (
            <div>
                <h5 align="center" className="senti_score_prefix">What the market is talking about
                </h5>


                <table className="table table-hover table-dark">
                    <thead>
                    <tr>
                        <th>From</th>
                        <th>Tweet</th>

                    </tr>
                    </thead>

                    <tbody>
                    {tweets.map((tweet, index) => {
                        return (<tr key={index} data-toggle="tooltip" data-placement="top" data-type="primary" title={tweet.createdAt} >
                                <td>@{tweet.user.screenName}</td>
                                <td><a href={tweet.url}>{tweet.text}</a></td>
                            </tr>

                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Tweet;
