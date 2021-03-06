import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import SharedNavBar from "./utilities/SharedNavBar";
import {Chart} from "react-google-charts";
import WaitLoader from './utilities/WaitLoader';
import SharedHeader from "./utilities/SharedHeader";
import Tweet from "./Tweet";
import Trade from "./Trade";
import {switchUrl} from "./utilities/utils";

class Quote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            loading: true
        };
    }

    componentDidMount() {
        fetch(switchUrl('spring', 'quote')
        )
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    quotes: data.quotes,
                    loading: false
                });
            });

    }

    volFormat = vol => {
        if (vol != null) {
            vol.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        } else {
            return "0"
        }
    };
    priceFormat = price => price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    getDayfromDate = date => date.split(/[- ]+/).pop();
    datePricePair = (data) => {
        let rslt = [['x', 'close']];
        for (let i = data.length - 1; i >= 0; i--) {
            rslt.push([data[i][0], data[i][4]])
        }
        return rslt;
    };

    render() {

        const rslts = this.state.quotes;

        const goBackLinks = [
            {
                address: '/',
                text: 'Back to Homepage'
            },
            {
                address: '/searchnews',
                text: 'Search News & Gauge Sentiment'
            }
        ];

        return (

            <div className="mx-auto">


                <SharedNavBar goBackLinks={goBackLinks} showFeedback={true}></SharedNavBar>

                <main role="main">
                    <SharedHeader text={"Top Picks of the Day"}/>
                    <WaitLoader loading={this.state.loading}/>
                    <div className="container">
                        <div className="row justify-content-center">
                            <section>
                                <div id="news_ticker" className="container">
                                    <Tweet/>
                                </div>
                            </section>
                            <div className="card-columns">
                                {rslts.map((quote, index) => {
                                    return (
                                        <div id="chart_card" className="card chart-card" key={index}>
                                            <div className="card-body pb-0">
                                                <h4 className="card-title font-weight-bold">{quote.dataset.name}</h4>
                                                <p className="card-text mb-4">{quote.dataset.newest_available_date}</p>
                                                <div className="d-flex justify-content-between">
                                                    <p className="display-4 align-self-end">{this.priceFormat(quote.dataset.data[0][4])}</p>
                                                    <p className="align-self-end pb-2"> vol {this.volFormat(quote.dataset.data[0][5])}</p>
                                                </div>
                                            </div>
                                            <Chart
                                                width={'380px'}
                                                height={'200px'}
                                                chartType="LineChart"
                                                loader={<div>Loading Chart</div>}
                                                data={this.datePricePair(quote.dataset.data)}
                                                options={{
                                                    lineWidth: 3,
                                                    hAxis: {
                                                        title: '1 year range',
                                                        textPosition: 'none',
                                                    },
                                                    vAxis: {
                                                        title: 'Price',
                                                    },
                                                }}
                                                rootProps={{'data-testid': '1'}}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </main>
                <footer className="footer mt-auto py-3"><cite title="Source Title">Disclaimer: </cite> This website is
                    for demostrations purpose only. It does not offer investment advice and nothing in them should be
                    construed as investment advice.
                </footer>

                <Trade/>
            </div>
        )
    }

}

export default Quote;
