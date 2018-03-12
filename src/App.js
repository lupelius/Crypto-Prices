import React, {
  Component
} from 'react';
import CoinContainer from './component/CoinContainer';
import Home from './component/Home'
import Detail from './component/Detail'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './component/redux/reducer'
import DetailedCoinContainer from './component/DetailedCoinContainer';

import { Switch, Route } from 'react-router-dom'
import Helper from './class/Helper';

const { SetCurrency } = require('./component/redux/actions/currency');
const { SetFeed } = require('./component/redux/actions/feed');

const Store = require('./component/redux/store');

class App extends Component {
  constructor(props) {
    super(props);
    // state {if the value is not used in render it should not be in state}
    this.state = {
      feed: null,
      currency: "USD"
    };
    this.totalAmount = 0;
    // init load

    // bind this to functions
    this.handleCurrencyUSD = this.handleCurrencyUSD.bind(this);
    this.handleCurrencyGBP = this.handleCurrencyGBP.bind(this);
    this.handleCurrencyEUR = this.handleCurrencyEUR.bind(this);
    this.handleCurrencyJPY = this.handleCurrencyJPY.bind(this);
    this.handleCurrencyKRW = this.handleCurrencyKRW.bind(this);
    this.renderSpinners = this.renderSpinners.bind(this);

    this.helper = new Helper();
  
  }
  componentDidMount() {
    // load data every 60 seconds
    this.streamId = setInterval(this.loadFeed.bind(this), 60000);
    Store.subscribe(() => {
      const { feed, currency } = Store.getState();
      this.setState({feed: feed, currency: currency});
    });
  }

  componentWillUnmount() {
    //clearInterval(this.streamId);
  }

  /**
   * get coinmarket feed data
   * @return {[type]} [description]
   */
  loadFeed() {
    console.log('getting feed data at: ' + Date());
	
	const { feed, currency } = Store.getState();
	let xhttp = new XMLHttpRequest();
	let self = this;
	self.setState({currency: currency});
	xhttp.onreadystatechange = function() {
	  if (this.readyState === 4 && this.status === 200) {
		Store.dispatch(SetFeed(JSON.parse(this.responseText)));
		self.setState({currency: currency});
		self.setState({
		  feed: JSON.parse(this.responseText)
		});
		document.getElementById('loading-gif').style.display = 'none';
	  }
	};
	xhttp.open("GET", "https://api.coinmarketcap.com/v1/ticker/?limit=10&convert=" + currency, true);
	xhttp.send();
  }
  
  
  loadSingleCur(cur) {
	console.log('getting '+cur+' feed data at: ' + Date());
	
	const { feed, currency } = Store.getState();
	let xhttp = new XMLHttpRequest();
	let self = this;
	self.setState({currency: currency});
	xhttp.onreadystatechange = function() {
	  if (this.readyState === 4 && this.status === 200) {
		Store.dispatch(SetFeed(JSON.parse(this.responseText)));
		self.setState({currency: currency});
		self.setState({
		  feed: JSON.parse(this.responseText)
		});
		document.getElementById('loading-gif').style.display = 'none';
	  }
	};
	xhttp.open("GET", "https://api.coinmarketcap.com/v1/ticker/"+ cur +"/?convert=" + currency, true);
	xhttp.send();
  }
  
  handleCurrencyUSD(coin) {
	this.handle("USD",coin);
  }
  handleCurrencyGBP(coin) {
	this.handle("GBP",coin);
  }
  handleCurrencyEUR(coin) {
	this.handle("EUR",coin);
  }
  handleCurrencyJPY(coin) {
	this.handle("JPY",coin);
  }
  handleCurrencyKRW(coin) {
	this.handle("KRW",coin);
  }
  handle(c,coin) {
	this.setState({currency: c});
	Store.dispatch(SetCurrency(c));
	if (coin) {
		this.loadSingleCur(coin);
	} else {
		this.loadFeed();
	}
  }

  renderSpinners(from) {	
    if (this.state.feed !== null) {
      let feed = this.state.feed;
      let getColor = this.helper.getColor;
      let getOrientation = this.helper.getOrientation;
      let coins = [];
      let self = this;

      let coinContainers = feed.map(function(feed, i) {
          // change color of percentage numbers
          let classes = {
            hour: getColor(feed.percent_change_1h),
            day: getColor(feed.percent_change_24h),
            day7: getColor(feed.percent_change_7d)
          }
          let orientations = {
            hour: getOrientation(feed.percent_change_1h),
            day: getOrientation(feed.percent_change_24h),
            day7: getOrientation(feed.percent_change_7d)
          }
          let percent = {
            hour: feed.percent_change_1h,
            day: feed.percent_change_24h,
            day7: feed.percent_change_7d
          }
          
          let name = '';
          let currency = {
            market_cap: feed.market_cap_usd,
            price: feed.price_usd,
          }
          // short names only
          if(feed.name.length>9){
            name = feed.symbol;
          }else{
            name = feed.name;
          }
          switch (self.state.currency) {
            case "GBP":
                currency = {
                    market_cap: feed.market_cap_gbp,
                    price: feed.price_gbp,
					symbol: "£",
					volume: feed["24h_volume_usd"]
                }
                break;
            case "EUR":
                currency = {
                    market_cap: feed.market_cap_eur,
                    price: feed.price_eur,
					symbol: "€",
					volume: feed["24h_volume_eur"]
                }
                break;
            case "JPY":
                currency = {
                    market_cap: feed.market_cap_jpy,
                    price: feed.price_jpy,
					symbol: "¥",
					volume: feed["24h_volume_jpy"]
                }
                break;
            case "KRW":
                currency = {
                    market_cap: feed.market_cap_krw,
                    price: feed.price_krw,
					symbol: "₩",
					volume: feed["24h_volume_krw"]
                }
                break;
			default:
				currency = {
                    market_cap: feed.market_cap_usd,
                    price: feed.price_usd,
					symbol: "$",
					volume: feed["24h_volume_usd"]
                }
                break;
          }
		  if (from === "home") {
			return (
                <CoinContainer key={i} id={feed.id} name={name} market_cap={currency.market_cap} symbol={feed.symbol} price={currency.price} classes={classes} orientations={orientations} percent={percent} currency={currency.symbol} rank={feed.rank}>
                </CoinContainer>
			);
		  } else {
			return (
                <DetailedCoinContainer key={i} id={feed.id} name={name} market_cap={currency.market_cap} symbol={feed.symbol} price={currency.price} classes={classes} orientations={orientations} percent={percent} currency={currency.symbol} available_supply={feed.available_supply} total_supply={feed.total_supply} volume={currency.volume} rank={feed.rank}>
                </DetailedCoinContainer>
			);
		  }
      });
      // but 3 coin containers in a row div
      while (coinContainers.length > 0) {
        let row = (<div key={Math.random()} className="row">{coinContainers.splice(0,3)}</div>);
        coins.push(row);
      }

      return coins;
    }
  }
  
  render() {
	let self = this;
    return (
	  <Switch>
		<Route exact path='/' render={
			({match}) =>
			<Home app={self} />
		  } />
		<Route exact path='/:coin' render={
			(props) =>
			<Detail {...props} app={self} />
		  }/>
	  </Switch>
    );
  }
}
export default App;
