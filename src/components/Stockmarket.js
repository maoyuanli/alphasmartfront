import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {marketChangeFormat} from './utilities/utils';

class Stockmarket extends Component {

    render() {

        const styles = {
            red: {color: 'red'},
            green: {color: 'green'},
        }

        if (this.props.market == null){
            var rslts = {
                change:'Market Data Unavailable',
                latest_date:'Market Data Unavailable',
                latest_val:'Market Data Unavailable',
                benchmark_date:'Market Data Unavailable',
                benchmark_val:'Market Data Unavailable'
            }
        }else {
            rslts = this.props.market;
        }


        return (
            <div>

                <div className="table-responsive">
                    <h5>NASDAQ-100 PM Settlement Value (XQC) Movement is
                        <span style={(rslts.change >= 0) ? styles.green : styles.red}> {marketChangeFormat(rslts.change)}</span>
                    </h5>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            {/*<th>Change</th>*/}
                            <th>Latest Closing</th>
                            <th>Latest Value</th>
                            <th>Benchmark Closing</th>
                            <th>Benchmark Value</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            {/*<td style={(rslts.change >= 0) ? styles.green : styles.red}>{marketChangeFormat(rslts.change)}</td>*/}
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
