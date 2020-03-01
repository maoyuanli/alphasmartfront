import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import linkedMugshot from './static/linkedin_mugshot.jpg';
import {
    topWordsFormat, switchUrl
} from './utilities/utils';
import Stockmarket from "./Stockmarket";
import SharedNavBar from "./utilities/SharedNavBar";
import WaitLoader from "./utilities/WaitLoader";
import SharedArticlesTable from "./utilities/SharedArticlesTable";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            market: '',
            filterTitle: '',
            loading: true,
        }

    };


    componentDidMount() {
        fetch(
            switchUrl('django','homepage')
        )
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    articles: data.articles,
                    topWordsOfAll: topWordsFormat(data.articles[0].top_words_of_all)
                })
            });
        fetch(switchUrl('django','stockmarket'))
            .then(res => res.json())
            .then((data) => {
                this.setState({market: data.market_return, loading: false})
            });
    }


    render() {
        const goBackLinks = [
            {
                address: '/searchnews',
                text: 'Search News & Gauge Sentiment'
            },
            {
                address: '/quote',
                text: 'Top Stock Picks'
            }
        ];

        return (
            <div>
                <SharedNavBar goBackLinks={goBackLinks} showFeedback={true}></SharedNavBar>

                <div className="jumbotron text-center">

                    <div id="BuiltWith" className="container">
                        <h3 className="jumbotron-heading">Built with Microservices</h3>
                        <h2 className="jumbotron-heading">Powered by AI</h2>

                        <div>
                            <hr className="new1"/>
                            <h5 id="sub_heading">The story between the Market and Sentiment</h5>
                        </div>
                    </div>
                    <div id="mugshot_div">
                        <div>
                            <img
                                src={linkedMugshot}
                                alt="Avatar" id={"linkedin_mugshot"}/>
                        </div>
                        <div>
                            <a href="mailto:maoyuan@gmail.com" className="btn btn-primary my-2">Send Email to
                                Mao</a>
                        </div>
                    </div>

                </div>
                <WaitLoader loading={this.state.loading}/>
                <section>
                    <div className="container">
                        <Stockmarket market={this.state.market}></Stockmarket>
                    </div>
                </section>
                <br/>

                <SharedArticlesTable articles={this.state.articles}/>
            </div>
        );
    }

}


export default Homepage;
