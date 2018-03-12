import React, {
  Component
} from 'react';

import CoinContainer from '../component/CoinContainer';
import '../css/App.css';
const Store = require('./redux/store');
const { SetCurrency } = require('./redux/actions/currency');
const { SetFeed } = require('./redux/actions/feed');

class Home extends Component {
  constructor(props) {
    super(props);
    // state {if the value is not used in render it should not be in state}
    this.state = {
      feed: null,
      currency: "USD"
    };
    // init load
    this.props.app.loadFeed();
	
    this.handleExpand = this.handleExpand.bind(this);
  
  }
  
  handleExpand(){
    this.expand.classList.toggle('expand');
  }

  render() {
  return (
  <div className="">
    <div className="container row">
      <div className="nine columns">
        <div id="coin-total">Crypto Prices</div>
      </div>
      <div className="three columns expand-btn-container">
        <button id="expand-btn" onClick={this.handleExpand}>{this.props.app.state.currency}<i className={"arrow down"}></i></button>
      </div>
      <div className="alright expand " ref={(value)=>this.expand = value}>
            <ul className="currency-list">
                <li onClick={() => this.props.app.handleCurrencyUSD()}>USD</li>
                <li onClick={() => this.props.app.handleCurrencyGBP()}>GBP</li>
                <li onClick={() => this.props.app.handleCurrencyEUR()}>EUR</li>
                <li onClick={() => this.props.app.handleCurrencyJPY()}>JPY</li>
                <li onClick={() => this.props.app.handleCurrencyKRW()}>KRW</li>
            </ul>            
      </div>
    </div>
    <img id="loading-gif" style={{display: 'block',margin: "0 auto"}} src="./loading.gif " alt="Loading..."></img>
    <div className="header twelve columns">
      <div className="container">
        <div className="three columns">
            <div>CRYPTOCURRENCY</div>
        </div>
        <div className="three columns">
            <div>PRICE</div>
        </div>
        <div className="three columns">
            <div>MARKET CAP</div>
        </div>
        <div className="three columns">
            <div>24H CHANGE</div>
        </div>
      </div>
    </div>
    {this.props.app.renderSpinners("home")}
  </div>
  );
  }
}

export default Home;
