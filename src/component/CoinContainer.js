import React from 'react';

const CoinContainer = (props) => (
<a href={"/"+props.id}>
  <div className="crypto-row twelve columns">
    <div className="coin-container container">
		<div className="three columns">
			<div className="rank">{props.rank}</div>
			<div className="icon"><img alt="crypto icon" src={"https://raw.githubusercontent.com/cjdowner/cryptocurrency-icons/master/32%402x/color/" + props.symbol.toLowerCase() + "%402x.png"} width="22px;" /></div>
			<div className="name">{props.name}</div>
			<img id="loading-gif" className={(props.name) ? "hide" : "show"} width="14px" src="./loading.gif " alt="Loading..."></img>
		</div>
		<div className="three columns">
			<div>{props.currency}{props.price}</div>
			<img id="loading-gif" className={(props.price) ? "hide" : "show"} width="14px" src="./loading.gif " alt="Loading..."></img>
		</div>
		<div className="three columns">
			<div>{props.currency}{props.market_cap}</div>
			<img id="loading-gif" className={(props.market_cap) ? "hide" : "show"} width="14px" src="./loading.gif " alt="Loading..."></img>
		</div>
		<div className="three columns">
			<div> <div className="twenty-four">24h:</div><span className={props.classes.day + " percent-day"}> {props.percent.day}%<i className={"arrow " + props.orientations.day}></i></span></div>
			<img id="loading-gif" className={(props.classes.day) ? "hide" : "show"} width="14px" src="./loading.gif " alt="Loading..."></img>
		</div>
        {props.children}
    </div>
  </div>
</a>
);


export default CoinContainer;
