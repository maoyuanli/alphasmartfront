import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Link} from "react-router-dom";
import resume from "./static/M.Li.Resume.pdf";
import {avgSentScore, publishTimeCleaner} from './utils'

class Searchnews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            term: ''
        };
        this.baseState = this.state;
        this.submit = this.submit.bind(this);
        this.changeTerm = this.changeTerm.bind(this);

    }

    resetForm = (event) => {
        this.setState(this.baseState);
        document.getElementById("searchField").value = "";
        event.preventDefault();
    };

    changeTerm(event) {
        this.setState({term: event.target.value.trim()})
    }

    submit(event) {
        let url = '/api/searchnews/?q=' + encodeURI(this.state.term);
        fetch(url).then(res => res.json())
            .then((data) => {
                this.setState({articles: data.articles})

            })
        event.preventDefault();
    }


    render() {

        const styles = {
            red: {color: 'red',},
            green: {color: 'green'}
        };

        const rslts = this.state.articles;

        let avg_score = avgSentScore(rslts);

        return (
            <div className="mx-auto">
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                        <Link to="/" className="btn btn-outline-light">Back to Homepage</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarNavAltMarkup"
                                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ml-auto">
                                <a className="nav-item nav-link" href={resume}>Resume</a>
                                <a className="nav-item nav-link"
                                   href="https://www.linkedin.com/in/mao-yuan-li-cfa-ocp-ll-m-ba6364120/">Linkedin
                                    Profile</a>
                                <a className="nav-item nav-link" href="https://github.com/maoyuanli/">GitHub</a>
                            </div>
                        </div>
                    </nav>
                </header>
                <main role="main">
                    <section className="jumbotron text-center">
                        <div className="container">
                            <h3 className="jumbotron-heading">Put in Keywords, Search for News</h3>
                        </div>
                    </section>
                    <div>
                        <form onSubmit={this.submit} class="form-inline md-form mr-auto mb-4">
                            <input className="form-control mr-sm-2" type="text" name="searchFor" id="searchField"
                                   placeholder="Search Keyword"
                                   onChange={this.changeTerm}/>
                            <button type="submit" class="btn btn-outline-success" id="searchBtn">Search</button>
                            <button type="submit" class="btn btn-outline-dark" id="clearBtn"
                                    onClick={this.resetForm}>Clear
                            </button>
                        </form>
                    </div>

                    <h5 align="center"><span className="table_title">Related News & Their Sentiment Scores</span>
                    </h5>
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
                </main>
            </div>
        )
    }

}

export default Searchnews;