import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';


class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            orderType: '',
            orderPrice: '',
            orderVolumn: '',
            existingOrders: [],
            orderPriceDisabled: false,
            submitButtonDisabled: true
        };
    }

    onChangeTickerHandler = (e) => {
        this.setState({
            ticker: e.target.value
        });
    };
    onChangeOrderTypeHandler = (e) => {
        this.setState({
            orderType: e.target.value
        });
        if (e.target.value.includes('Market')) {
            this.setState({
                orderPriceDisabled: true
            });
        } else {
            this.setState({
                orderPriceDisabled: false
            });
        }
    };
    onChangeOrderPriceHandler = (e) => {
        this.setState({
            orderPrice: e.target.value
        });
    };
    onChangeOrderVolumnHandler = (e) => {
        this.setState({
            orderVolumn: e.target.value
        });
        if (this.state.ticker.length !== 0 && this.state.orderType.length !== 0 && this.state.orderVolumn != null) {
            this.setState({
                submitButtonDisabled: false
            });
        }
    };

    onSubmitHandler = (e) => {
        e.preventDefault();
        const ticker = this.state.ticker;
        const orderType = this.state.orderType;
        const orderPrice = this.state.orderPrice.length === 0 ? null:this.state.orderPrice;
        const orderVolumn = this.state.orderVolumn;
        const feedbackData = {
            order: {
                ticker: ticker,
                order_type: orderType,
                order_price: orderPrice,
                order_volumn: orderVolumn,
                created_at: "2012-12-17T11:04:35"
            }
        };
        axios.defaults.xsrfHeaderName = "X-CSRFToken";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.post('' +
            // 'http://localhost:8000/api/order/'
            'https://alphasmartback.herokuapp.com/api/order/'
            , feedbackData).then(this.fetchTable);
        this.setState({
            ticker: '',
            orderType: '',
            orderPrice: '',
            orderVolumn: '',
            submitButtonDisabled: true
        })
    };

    fetchTable = () => {
        fetch(
            // 'http://localhost:8000/api/order/'
        'https://alphasmartback.herokuapp.com/api/order/'
        )
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    existingOrders: data.orders
                })
            });
    };

    componentDidMount() {
        this.fetchTable();
    }

    render() {
        const defaultSorted = [{
            dataField: 'id',
            order: 'desc' // desc or asc
        }];

        const existingOrders = this.state.existingOrders;
        const columns = [
            {dataField: "id", text: 'Order ID', sort: true},
            {dataField: "ticker", text: 'Stock Name'},
            {dataField: "order_type", text: 'Order Type'},
            {dataField: "order_price", text: 'Order Price'},
            {dataField: "order_volumn", text: 'Order Volumn'},
            {dataField: "created_at", text: 'Time Received'}
        ];


        return (
            <div className="container mx-auto">
                <hr/>
                <h3 className="display-5">Place Order</h3>
                <hr/>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Stock Name</label>
                            <select className="custom-select" id="inputGroupSelect01" value={this.state.ticker}
                                    onChange={this.onChangeTickerHandler}>
                                <option value="">Choose...</option>
                                <option value="ABN AMRO BANK N.V. (ABN)">ABN AMRO BANK N.V. (ABN)</option>
                                <option value="ADYEN (ADYEN)">ADYEN (ADYEN)</option>
                                <option value="ING GROEP N.V. (INGA)">ING GROEP N.V. (INGA)</option>
                                <option value="KPN KON (KPN)">KPN KON (KPN)</option>
                                <option value="ROYAL DUTCH SHELLA (RDSA)">ROYAL DUTCH SHELLA (RDSA)</option>
                                <option value="BNP PARIBAS ACT.A (BNP)">BNP PARIBAS ACT.A (BNP)</option>
                            </select>

                        </div>
                        <div className="form-group col-md-6">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Order Type</label>
                            <select className="custom-select" id="inputGroupSelect01" value={this.state.orderType}
                                    onChange={this.onChangeOrderTypeHandler}>
                                <option value="">Choose...</option>
                                <option value="Limited Buy">Limited Buy</option>
                                <option value="Limited Sell">Limited Sell</option>
                                <option value="Market Buy">Market Buy</option>
                                <option value="Market Sell">Market Sell</option>
                            </select>

                        </div>
                        <div className="form-group col-md-6">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Order Price</label>
                            <input type="number" className="form-control" name="orderPrice"
                                   value={this.state.orderPrice} disabled={this.state.orderPriceDisabled ? true : null}
                                   onChange={this.onChangeOrderPriceHandler}
                                   placeholder="Enter (e.g. 10.55 . Unapplicable to Market Order)"/>
                        </div>

                        <div className="form-group col-md-6">
                            <label className="input-group-text" htmlFor="inputGroupSelect01">Order Volumn</label>
                            <input type="number" className="form-control" name="orderVolumn"
                                   value={this.state.orderVolumn}
                                   onChange={this.onChangeOrderVolumnHandler}
                                   placeholder="Enter (e.g. 5000)"/>
                        </div>
                    </div>
                    <button disabled={this.state.submitButtonDisabled} type="submit" id="subBtn"
                            className="btn btn-success" onClick={this.onSubmitHandler}>Submit Order
                    </button>
                    <hr/>
                    <BootstrapTable bootstrap4={true} classes="table-striped table-dark" keyField='id'
                                    data={existingOrders}
                                    columns={columns} defaultSorted={defaultSorted}/>
                </form>
            </div>
        )
    }
}

export default Trade;
