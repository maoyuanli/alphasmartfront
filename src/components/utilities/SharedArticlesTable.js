import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {publishTimeCleaner, ScoreNumColorStyle} from "./utils";


class SharedArticlesTable extends Component {
    render() {
        const rslts = this.props.articles;
        return (
            <div>
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
                                    style={(article.sentiment >= 0) ? ScoreNumColorStyle.green : ScoreNumColorStyle.red}>{article.sentiment}</span>
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
        )
    }
}

export default SharedArticlesTable;
