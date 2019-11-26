import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import BootstrapTable from 'react-bootstrap-table-next';


class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            companyName: '',
            orderType: '',
            orderPrice: '',
            orderVolumn: '',
            existingOrders: []
        };
    }

    onChangeTickerHandler = (e) => {
        this.setState({
            ticker: e.target.value
        });
    };
    onChangeCompanyNameHandler = (e) => {
        this.setState({
            companyName: e.target.value
        });
    };
    onChangeOrderTypeHandler = (e) => {
        this.setState({
            orderType: e.target.value
        });
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
    };

    onSubmitHandler = (e) => {
        e.preventDefault();
        const ticker = this.state.ticker;
        const companyName = this.state.companyName;
        const orderType = this.state.orderType;
        const orderPrice = this.state.orderPrice;
        const orderVolumn = this.state.orderVolumn;
        const feedbackData = {
            ticker: ticker,
            companyName: companyName,
            orderType: orderType,
            orderPrice: orderPrice,
            orderVolumn: orderVolumn,
        };
        console.log(feedbackData);
        axios.defaults.xsrfHeaderName = "X-CSRFToken";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.post('' +
            // 'http://localhost:8080/api/setorder/'
            'https://alphaspring.herokuapp.com/api/setorder/'
            , feedbackData).then(this.fetchTable);
        this.setState({ticker: '', companyName: '', orderType: '', orderPrice: '', orderVolumn: ''})
    };

    fetchTable = () => {
        fetch(
            // 'http://localhost:8080/api/getorder/'
            'https://alphaspring.herokuapp.com/api/getorder/'
        )
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    existingOrders: data.orders
                })
            });
    }

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
            // {dataField: "companyName", text:'Company Name'},
            {dataField: "orderType", text: 'Order Type'},
            {dataField: "orderPrice", text: 'Order Price'},
            {dataField: "orderVolumn", text: 'Order Volumn'},
        ];

        return (
            <div className="container">
                <div id="order_form" className="jumbotron text-center blue-grey lighten-5">

                    <h3 className="display-5">Place Your Order</h3>

                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Stock Name</label>
                                <select className="custom-select" id="inputGroupSelect01" value={this.state.ticker}
                                        onChange={this.onChangeTickerHandler}>
                                    <option selected>Choose...</option>
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
                                    <option selected>Choose...</option>
                                    <option value="Market Buy">Market Buy</option>
                                    <option value="Market Sell">Market Sell</option>
                                    <option value="Limited Buy">Limited Buy</option>
                                    <option value="Limited Sell">Limited Sell</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Order Price</label>
                                <input type="text" className="form-control" name="orderPrice"
                                       value={this.state.orderPrice}
                                       onChange={this.onChangeOrderPriceHandler}
                                       placeholder="Enter"/>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Order Volumn</label>
                                <input type="text" className="form-control" name="orderVolumn"
                                       value={this.state.orderVolumn}
                                       onChange={this.onChangeOrderVolumnHandler}
                                       placeholder="Enter"/>
                            </div>
                        </div>

                        <Popup trigger={<button id="subBtn" className="btn btn-success"
                                                onClick={this.onSubmitHandler}>Submit Order</button>} modal
                               closeOnDocumentClick>
                            <div id="SuccessMsg" className="alert alert-light" role="alert">
                                <h4 className="alert-heading">Order Sumbmission Success!</h4>
                                <hr className="new1"/>
                            </div>
                        </Popup>
                        <hr/>
                        <BootstrapTable bootstrap4={true} classes="table-striped table-dark" keyField='id' data={existingOrders}
                                        columns={columns} defaultSorted={defaultSorted}/>

                    </form>
                </div>
            </div>
        )
    }
}

export default Trade;
