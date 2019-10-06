import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {avgSentScore, filterZeroSentAndNullDescr} from './utilities/utils'
import SharedNavBar from "./utilities/SharedNavBar";
import SharedHeader from "./utilities/SharedHeader";
import SharedArticlesTable from "./utilities/SharedArticlesTable";

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
        let url = 'https://alphasmartback.herokuapp.com/api/searchnews/?q=' + encodeURI(this.state.term);
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

        const raw_rslts = this.state.articles;
        let rslts = filterZeroSentAndNullDescr(raw_rslts);

        let avg_score = avgSentScore(rslts);
        const goBackLinks = [
            {
                address:'/',
                text:'Back to Homepage'
            }
        ];
        return (
            <div className="mx-auto">
                <SharedNavBar goBackLinks={goBackLinks}></SharedNavBar>

                <main role="main">
                    <SharedHeader text={"Put in Keywords, Search for News"}/>
                    <div>
                        <form onSubmit={this.submit} className="form-inline md-form mr-auto mb-4">
                            <input className="form-control mr-sm-2" type="text" name="searchFor" id="searchField"
                                   placeholder="Search Keyword"
                                   onChange={this.changeTerm}/>
                            <button type="submit" className="btn btn-outline-success" id="searchBtn">Search</button>
                            <button type="submit" className="btn btn-outline-dark" id="clearBtn"
                                    onClick={this.resetForm}>Clear
                            </button>
                        </form>
                    </div>

                    <h5 align="center"><span className="table_title">Related News & Their Sentiment Scores</span>
                    </h5>
                    <h5 align="center" className="senti_score_prefix">Overall Sentiment Score is <span
                        id="avg_senti_score" style={(avg_score >= 0) ? styles.green : styles.red}>{avg_score}</span>
                    </h5>
                   <SharedArticlesTable articles={rslts}/>
                </main>
            </div>
        )
    }

}

export default Searchnews;
