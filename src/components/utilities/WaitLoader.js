import React, {Component} from 'react';
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';
import 'bootstrap/dist/css/bootstrap.css'

class WaitLoader extends Component{

    render() {

        const override = css`
                        display: block;
                        margin: 0 auto;
                        border-color: red;
                     
                        `;

        if(this.props.loading === true){
            return <div className='sweet-loading'>
                <br/>
                <h2>Calculating </h2>
                <br/>
                <GridLoader
                    css={override}
                    sizeUnit={"px"}
                    size={80}
                    color={'#123abc'}
                    loading={this.props.loading}
                />
            </div>
        }else {
            return <div></div>
        }

    }


}
export default WaitLoader;
