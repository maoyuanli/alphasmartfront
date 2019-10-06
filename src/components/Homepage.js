import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import linkedMugshot from './static/linkedin_mugshot.jpg';
import {
    avgSentScore,
    topWordsFormat,
    filterZeroSentAndNullDescr,
    ScoreNumColorStyle
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
        fetch('https://alphasmartback.herokuapp.com/api/homepage/')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    articles: data.articles,
                    topWordsOfAll: topWordsFormat(data.articles[0].top_words_of_all)
                })
            });
        fetch('https://alphasmartback.herokuapp.com/api/stockmarket/')
            .then(res => res.json())
            .then((data) => {
                this.setState({market: data.market_return, loading: false})
            });
        fetch('https://alphaspring.herokuapp.com/api/quote/')
            .then(res => res.json())
        ;
    }


    render() {
        const {articles, filterTitle} = this.state;
        let non_zero_sent = filterZeroSentAndNullDescr(articles);
        let filteredArticles = non_zero_sent.filter(article => article.title.toLowerCase().includes(filterTitle.toLowerCase()));
        const rslts = filteredArticles;

        let avg_score = avgSentScore(rslts);
        const goBackLinks = [
            {
                address: '/searchnews',
                text: 'Search News & Gauge Sentiment'
            },
            {
                address: '/quote',
                text: 'Top Stock Picks'
            }
        ]
        return (

            <div>
                <SharedNavBar goBackLinks={goBackLinks}></SharedNavBar>

                <div className="jumbotron text-center">

                    <div id="BuiltWith" className="container">
                        <h3 className="jumbotron-heading">Built with React & Django</h3>
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
                        <div><p id={"CFA"}>Mao-Yuan Li CFA, OCP, LL.M</p></div>
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
                <div className="table-responsive">
                    <h5 align="center" className="senti_score_prefix">Overall Sentiment Score is <span
                        id="avg_senti_score"
                        style={(avg_score >= 0) ? ScoreNumColorStyle.green : ScoreNumColorStyle.red}>{avg_score}</span>
                    </h5>
                    <div>
                        <form id="filterDiv" className="form-inline md-form mr-auto mb-4">
                            <input className="form-control mr-sm-2" type="search" name="filterTitle" id="filterField"
                                   placeholder="Type Here to Filter News Title"
                                   onChange={
                                       event => {
                                           this.setState(
                                               {filterTitle: event.target.value}, () => {
                                               }
                                           )
                                       }
                                   }/>
                        </form>
                    </div>

                    <SharedArticlesTable articles={rslts}/>
                </div>
            </div>
        );
    }

}


export default Homepage;
