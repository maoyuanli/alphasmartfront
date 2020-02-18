import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {marketChangeFormat, ScoreNumColorStyle} from './utilities/utils';

class Stockmarket extends Component {

    render() {

        if (this.props.market == null) {
            var rslts = {
                change: 'Market Data Unavailable',
                latest_date: 'Market Data Unavailable',
                latest_val: 'Market Data Unavailable',
                benchmark_date: 'Market Data Unavailable',
                benchmark_val: 'Market Data Unavailable'
            }
        } else {
            rslts = this.props.market;
        }

        return (
            <div>
                <div>
                    <h5>NASDAQ-100 PM Settlement Value (XQC) Movement is
                        <span
                            style={(rslts.change >= 0) ? ScoreNumColorStyle.green : ScoreNumColorStyle.red}> {marketChangeFormat(rslts.change)}</span>
                    </h5>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Latest Closing</th>
                            <th>Latest Value</th>
                            <th>Benchmark Closing</th>
                            <th>Benchmark Value</th>
                        </tr>
                        </thead>

                        <tbody id="market_table">
                        <tr>
                            <td>{rslts.latest_date}</td>
                            <td>{rslts.latest_val}</td>
                            <td>{rslts.benchmark_date}</td>
                            <td>{rslts.benchmark_val}</td>
                        </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}


export default Stockmarket;
