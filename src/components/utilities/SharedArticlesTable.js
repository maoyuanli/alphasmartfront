import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {avgSentScore, filterZeroSentScore, publishTimeCleaner, ScoreNumColorStyle} from "./utils";


class SharedArticlesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterTitle: '',
        }
    };

    render() {

        const filterTitle = this.state.filterTitle;
        const articles = this.props.articles;
        let non_zero_sent = filterZeroSentScore(articles);
        let filteredArticles = non_zero_sent.filter(article => article.title.toLowerCase().includes(filterTitle.toLowerCase()));
        const rslts = filteredArticles;
        let avg_score = avgSentScore(rslts);

        return (
            <div>
                <h5 align="center" className="senti_score_prefix">Overall Sentiment Score is <span
                    id="avg_senti_score"
                    style={(avg_score >= 0) ? ScoreNumColorStyle.green : ScoreNumColorStyle.red}>{avg_score}</span>
                </h5>
                <div>
                    <form id="filterDiv" className="form-inline md-form mr-auto mb-4">
                        <input className="form-control mr-sm-2" type="search" name="filterTitle" id="filterField"
                               placeholder="Type Here to Filter News Title"
                               onChange={event => {
                                   this.setState(
                                       {
                                           filterTitle: event.target.value
                                       }, () => {
                                       }
                                   )
                               }}/>
                    </form>
                </div>


                <table className="table table-hover table-dark">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Sentiment</th>
                        <th>Source</th>
                        {/*<th>Summary</th>*/}
                        <th>Publish Date</th>
                    </tr>
                    </thead>

                    <tbody>
                    {rslts.map((article, index) => {
                        return (<tr id="article_table" key={index} data-toggle="tooltip" data-placement="top" data-type="primary" title={article.description} >
                                <td><a href={article.url}>{article.title}</a></td>
                                <td><span
                                    style={(article.sentiment >= 0) ? ScoreNumColorStyle.green : ScoreNumColorStyle.red}>{article.sentiment}</span>
                                </td>
                                <td>{article.source.name}</td>
                                {/*<td>{article.description}</td>*/}
                                <td>{publishTimeCleaner(article.publishedAt)}</td>
                            </tr>

                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SharedArticlesTable;
