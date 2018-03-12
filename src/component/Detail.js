import React, {
  Component
} from 'react';
import { Link } from 'react-router-dom'

class Detail extends Component {
  constructor(props) {
    super(props);
	this.props.app.loadSingleCur(this.props.match.params.coin);
	this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand(){
    this.expand.classList.toggle('expand');
  }

  render() {
	return (
		<div>
		    <div className="container row">
			<div className="nine columns">
			  <div id="coin-total">
				  <div className="back-button">	
					<Link to='/'><i className="arrow left detail-page-back"></i></Link>
				  </div>
				  <h1>
				  {this.props.match.params.coin}
				  </h1>
			  </div>
			</div>
			<div className="three columns expand-btn-container">
			  <button id="expand-btn" onClick={this.handleExpand}>{this.props.app.state.currency}<i className={"arrow down"}></i></button>
			</div>
			<div className="alright expand " ref={(value)=>this.expand = value}>
				<ul className="currency-list">
					<li onClick={() => this.props.app.handleCurrencyUSD(this.props.match.params.coin)}>USD</li>
					<li onClick={() => this.props.app.handleCurrencyGBP(this.props.match.params.coin)}>GBP</li>
					<li onClick={() => this.props.app.handleCurrencyEUR(this.props.match.params.coin)}>EUR</li>
					<li onClick={() => this.props.app.handleCurrencyJPY(this.props.match.params.coin)}>JPY</li>
					<li onClick={() => this.props.app.handleCurrencyKRW(this.props.match.params.coin)}>KRW</li>
				</ul>            
		    </div>
		  </div>
		  <img id="loading-gif" style={{display: 'block',margin: "0 auto"}} src="./loading.gif " alt="Loading..."></img>
		  {this.props.app.renderSpinners("detail")}
		</div>
	);
  }
}

export default Detail;
