import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {marketChangeFormat} from './utils';

class Stockmarket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            market: ''
        }

    };


    componentDidMount() {
        fetch('/api/stockmarket/')
            .then(res => res.json())
            .then((data) => {
                this.setState({market: data.market_return})
            })

    }


    render() {

        const styles = {
            red: {color: 'red'},
            green: {color: 'green'},
        }

        if (this.state.market == null){
            var rslts = {
                change:'Market Data Unavailable',
                latest_date:'Market Data Unavailable',
                latest_val:'Market Data Unavailable',
                benchmark_date:'Market Data Unavailable',
                benchmark_val:'Market Data Unavailable'
            }
        }else {
            var rslts = this.state.market;
        }


        return (
            <div>

                <div className="table-responsive">
                    <h5>NASDAQ-100 PM Settlement Value (XQC)</h5>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Change</th>
                            <th>Latest Closing</th>
                            <th>Latest Value</th>
                            <th>Benchmark Closing</th>
                            <th>Benchmark Value</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td style={(rslts.change >= 0) ? styles.green : styles.red}>{marketChangeFormat(rslts.change)}</td>
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