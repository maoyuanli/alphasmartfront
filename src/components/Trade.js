import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import SharedHeader from "./utilities/SharedHeader";
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
        this.options = {
            defaultSortName: 'id',  // default sort column name
            defaultSortOrder: 'desc'  // default sort order
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
            'http://localhost:8080/api/setorder/'
            , feedbackData);
            // .then((data) => {
            //     this.setState({existingOrders: data})
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
        this.setState({ticker: '', companyName: '', orderType: '', orderPrice: '',orderVolumn:''})
    };

    UNSAFE_componentWillUpdate() {
        fetch(
            'http://localhost:8080/api/getorder/'
        )
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    existingOrders: data.orders
                })
            });
    }

    render() {

        const existingOrders = this.state.existingOrders;
        const columns = [
            {dataField: "id", text:'Order ID', sort:true},
            {dataField: "ticker", text:'Ticker'},
            {dataField: "companyName", text:'Company Name'},
        ]
        return (
            <div className="container">
                <SharedHeader text={"Please Place Your Order"}/>

                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label>ticker</label>
                        <input type="text" className="form-control" name="ticker" value={this.state.ticker}
                               onChange={this.onChangeTickerHandler}
                               placeholder="ABN"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">companyName</label>
                        <input type="companyName" className="form-control" name="companyName" value={this.state.companyName}
                               onChange={this.onChangeCompanyNameHandler}
                               placeholder="ABN AMRO BANK N.V."/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">orderType</label>
                        <input type="text" className="form-control" name="orderType" value={this.state.orderType}
                               onChange={this.onChangeOrderTypeHandler}
                               placeholder="Market"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">orderPrice</label>
                        <input type="text" className="form-control" name="orderPrice" value={this.state.orderPrice}
                                  onChange={this.onChangeOrderPriceHandler}
                                  placeholder="10.55" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">orderVolumn</label>
                        <input type="text" className="form-control" name="orderVolumn" value={this.state.orderVolumn}
                               onChange={this.onChangeOrderVolumnHandler}
                               placeholder="5000" />
                    </div>
                    <Popup trigger={<button id="subBtn" className="btn btn-success" onClick={this.handleFeedbackSuccess}>Submit</button>} modal
                           closeOnDocumentClick>
                        <div id="SuccessMsg" className="alert alert-light" role="alert">
                            <h4 className="alert-heading">Thank you for your feedback!</h4>
                            <hr className="new1" />
                        </div>
                    </Popup>

                    <BootstrapTable keyField='id' data = {existingOrders} columns={columns} options={this.options} />

                    {/*<table className="table table-hover table-dark">*/}
                    {/*    <thead>*/}
                    {/*    <tr>*/}
                    {/*        <th>Order ID</th>*/}
                    {/*        <th>Ticker</th>*/}
                    {/*        <th>Company Name</th>*/}
                    {/*        <th>Order Type</th>*/}
                    {/*        <th>Order Price</th>*/}
                    {/*        <th>Order Volumn</th>*/}
                    {/*        <th>Order Datetime</th>*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}

                    {/*    <tbody>*/}
                    {/*    {existingOrders.map((order, index) => {*/}
                    {/*        return (<tr id="article_table" key={index} data-placement="top" data-type="primary" >*/}
                    {/*                <td>{order.id}</td>*/}
                    {/*                <td>{order.ticker}</td>*/}
                    {/*                <td>{order.companyName}</td>*/}
                    {/*                <td>{order.orderType}</td>*/}
                    {/*                <td>{order.orderPrice}</td>*/}
                    {/*                <td>{order.orderVolumn}</td>*/}
                    {/*                <td>{order.createdDate}</td>*/}
                    {/*            </tr>*/}

                    {/*        )*/}
                    {/*    })}*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                </form>
            </div>
        )
    }
}

export default Trade;
