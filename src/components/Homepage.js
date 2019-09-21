import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import resume from './static/M.Li.Resume.pdf';
import linkedMugshot from './static/linkedin_mugshot.jpg';
import {Link} from 'react-router-dom';
import {avgSentScore, publishTimeCleaner, topWordsFormmat} from './utils';
import Stockmarket from "./Stockmarket";


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            topwords: '',
            filterTitle: ''
        }

    };


    componentDidMount() {
        fetch('/api/homepage/')
            .then(res => res.json())
            .then((data) => {
                this.setState({articles: data.articles})
                this.setState({topWordsOfAll: topWordsFormmat(data.articles[0].top_words_of_all)})
            })

    }


    render() {
        const {articles, filterTitle} = this.state;
        const filteredArticles = articles.filter(article => article.title.toLowerCase().includes(filterTitle.toLowerCase()));
        const styles = {
            red: {color: 'red'},
            green: {color: 'green'},
            topwords_style: {'font-style': 'italic', 'font-family': 'serif', 'font-weight': 'bold'}
        }

        // const rslts = this.state.articles;
        const rslts = filteredArticles;
        const topWords = this.state.topWordsOfAll;

        let avg_score = avgSentScore(rslts);

        return (

            <div>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                    <Link to="/searchnews" className="btn btn-outline-light">Search News & Gauge Sentiment</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            <a className="nav-item nav-link" href={resume}>Resume</a>
                            {/*<a className="nav-item nav-link"*/}
                            {/*   href="https://www.linkedin.com/in/mao-yuan-li-cfa-ocp-ll-m-ba6364120/">Linkedin*/}
                            {/*    Profile</a>*/}
                            <a className="nav-item nav-link" href="https://github.com/maoyuanli/">GitHub</a>
                            <Link to="/feedback" className="btn btn-outline-warning">Feedback</Link>
                        </div>
                    </div>
                </nav>

                <div className="jumbotron text-center">

                    <div id="BuiltWith" class="container">
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
                        <Stockmarket></Stockmarket>
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

                    <h6 align="left" className="senti_score_prefix">Overall Sentiment Score is <span
                        id="avg_senti_score" style={(avg_score >= 0) ? styles.green : styles.red}>{avg_score}</span>
                    </h6>
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
