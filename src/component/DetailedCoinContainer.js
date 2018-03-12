import React from 'react';

const DetailedCoinContainer = (props) => (
  <div className="single-crypto-row twelve columns">
    <div className="coin-container container">
		<div className="coin-container container">
			<div className="four columns">
				<div>Price: {props.currency}{props.price}</div>
				<img id="loading-gif" className={(props.price) ? "hide" : "show"} width="14px" src="./loading.gif " alt="Loading..."></img>
			</div>
			<div className="four columns">
				<div>Market cap: {props.currency}{props.market_cap}</div>
				<img id="loading-gif" className={(props.market_cap) ? "hide" : "show"} width="14px" src="./loading.gif " alt="Loading..."></img>
			</div>
			<div className="four columns">
				<div> <div className="twenty-four">24h change:</div><span className={props.classes.day + " percent-day"}> {props.percent.day}%<i className={"arrow " + props.orientations.day}></i></span></div>
				<img id="loading-gif" className={(props.classes.day) ? "hide" : "show"} width="14px" src="./loading.gif " alt="Loading..."></img>
			</div>
			{props.children}
		</div>
		<div className="coin-container container">
			<div className="four columns">
				<div>Available Supply: {props.currency}{props.available_supply}</div>
				<img id="loading-gif" className={(props.available_supply) ? "hide" : "show"} width="14px" src="./loading.gif " alt="Loading..."></img>
			</div>
			<div className="four columns">
				<div>Total Supply: {props.currency}{props.total_supply}</div>
				<img id="loading-gif" className={(props.total_supply) ? "hide" : "show"} width="14px" src="./loading.gif " alt="Loading..."></img>
			</div>
			<div className="four columns">
				<div> <div className="twenty-four">24h volume:</div>{props.volume}</div>
				<img id="loading-gif" className={(props.volume) ? "hide" : "show"} width="14px" src="./loading.gif " alt="Loading..."></img>
			</div>
			{props.children}
		</div>
    </div>
  </div>
);


export default DetailedCoinContainer;
