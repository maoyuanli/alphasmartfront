import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import linkedMugshot from './static/linkedin_mugshot.jpg';
import {avgSentScore, publishTimeCleaner, topWordsFormat, filterZeroSentAndNullDescr} from './utils';
import Stockmarket from "./Stockmarket";
import SharedNavBar from "./SharedNavBar";


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            market:'',
            topwords: '',
            filterTitle: ''
        }

    };


    componentDidMount() {
        fetch('https://alphasmartback.herokuapp.com/api/homepage/')
            .then(res => res.json())
            .then((data) => {
                this.setState({articles: data.articles});
                this.setState({topWordsOfAll: topWordsFormat(data.articles[0].top_words_of_all)})
            });
        fetch('https://alphasmartback.herokuapp.com/api/stockmarket/')
            .then(res => res.json())
            .then((data) => {
                this.setState({market: data.market_return})
            })

    }


    render() {
        const {articles, filterTitle} = this.state;
        let non_zero_sent = filterZeroSentAndNullDescr(articles);
        let filteredArticles = non_zero_sent.filter(article => article.title.toLowerCase().includes(filterTitle.toLowerCase()));
        const styles = {
            red: {color: 'red'},
            green: {color: 'green'},
            topwords_style: {'ontStyle': 'italic', 'fontFamily': 'serif', 'fontWeight': 'bold'}
        }

        const rslts = filteredArticles;
        const topWords = this.state.topWordsOfAll;

        let avg_score = avgSentScore(rslts);
        const goBackLinks = [
            {
                address:'/searchnews',
                text:'Search News & Gauge Sentiment'
            },
            {
                address: '/quote',
                text:'Quotes'
            }
        ]
        return (

            <div>
                <SharedNavBar goBackLinks={goBackLinks} ></SharedNavBar>

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
                        <div>
                            <a href="mailto:maoyuan@gmail.com" className="btn btn-primary my-2">Send Email to
                                Mao</a>
                        </div>
                    </div>

                </div>

                <section>
                    <div className="container">
                        <Stockmarket market={this.state.market}></Stockmarket>
                    </div>
                </section>
                <br/>
                <div className="table-responsive">
                    <h5 align="center">
                            <span className="table_title" id="topwords"
                                  style={styles.topwords_style}>{topWords} &nbsp;</span>
                        <span
                            className="table_title">- Here is today's top business news & their Sentiment Scores</span>
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

                    <h5 align="center" className="senti_score_prefix">Overall Sentiment Score is <span
                        id="avg_senti_score" style={(avg_score >= 0) ? styles.green : styles.red}>{avg_score}</span>
                    </h5>
                    <table className="table table-striped">

                        <thead>

                        <tr>
                            <th>Title</th>
                            <th>Sentiment</th>
                            <th>Source</th>
                            <th>Summary</th>
                            <th>Publish Date</th>
                        </tr>
                        </thead>

                        <tbody>
                        {rslts.map((article, index) => {
                            return (<tr key={index}>
                                    <td><a href={article.url}>{article.title}</a></td>
                                    <td><span
                                        style={(article.sentiment >= 0) ? styles.green : styles.red}>{article.sentiment}</span>
                                    </td>
                                    <td>{article.source.name}</td>
                                    <td>{article.description}</td>
                                    <td>{publishTimeCleaner(article.publishedAt)}</td>
                                </tr>

                            )
                        })}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}


export default Homepage;
