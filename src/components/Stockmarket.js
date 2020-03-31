import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {marketChangeFormat, ScoreNumColorStyle, switchUrl} from './utilities/utils';
import WaitLoader from "./utilities/WaitLoader";

class Stockmarket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            market: '',
            loading: true,
        }
    }

    componentDidMount() {
        fetch(switchUrl('django', 'stockmarket'))
            .then(res => res.json())
            .then((data) => {
                this.setState({market: data.market_return,
                    loading: false})
            })
    }

    render() {

        if (this.state.market == null) {
            var rslts = {
                change: 'Market Data Unavailable',
                latest_date: 'Market Data Unavailable',
                latest_val: 'Market Data Unavailable',
                benchmark_date: 'Market Data Unavailable',
                benchmark_val: 'Market Data Unavailable'
            }
        } else {
            rslts = this.state.market;
        }

        return (
            <div>
                <div>
                    <h5>NASDAQ-100 PM Settlement Value (XQC) Movement is
                        <span
                            style={(rslts.change >= 0) ? ScoreNumColorStyle.green : ScoreNumColorStyle.red}> {marketChangeFormat(rslts.change)}</span>
                    </h5>
                    <WaitLoader loading={this.state.loading}/>
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
