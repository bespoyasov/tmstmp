import React from 'react';
import ReactDOM from 'react-dom';

import {AppCnstns} from './constants.js';
import {AppHelpers} from './helpers.js';


class AppView extends React.Component {
	
	state = {
		tmstmp: 0,
		date: 0,
		type: 1
	};
	
	componentDidMount() {
		let today = AppHelpers.getTodayDateAndTimestamp();
		
		this.setState({
			date: "Сегодня",
			tmstmp: today.timestamp
		})
	}
	
	onChangeDateInput(event) {
		let vl = event.target.value;
		let res = AppHelpers.parseDate(vl);
		
		let tmstmp = res ? (res.timestamp || '0') : '0';
		tmstmp = parseInt(tmstmp);
		if (this.state.type !== 1) tmstmp /= 1000
		
		this.setState({
			date: vl,
			tmstmp: tmstmp
		})
	}
	
	onChangeTimestampInput(event) {
		let vl = event.target.value;
		let res = AppHelpers.parseTimestamp(vl);
		
		let date = res ? (res.date || '') : '';
		let tmstmp = parseInt(vl);
		if (this.state.type !== 1) tmstmp /= 1000
		
		this.setState({
			date: date,
			tmstmp: tmstmp
		})
	}
	
	onChangeSelect(event) {
		let vl = parseInt(event.target.value);
		let tmstmp = this.state.tmstmp;
		if (vl !== 1) tmstmp /= 1000;
		else tmstmp *= 1000;
		
		this.setState({
			type: vl,
			tmstmp: tmstmp
		})
	}
		
	render() {
				
		return(
			<div className="container">
				
				<label className="app-label">
					<input 
						type="text" 
						placeholder="Дата" 
						ref="date" 
						value={this.state.date}
						onKeyUp={this.onChangeDateInput.bind(this)}
						onChange={this.onChangeDateInput.bind(this)}
						autoFocus  
					/>
				</label>
				
				<div className="app-label app-label--tmstmp">
					<input 
						type="text" 
						placeholder="Таймштамп" 
						ref="tmstmp" 
						value={this.state.tmstmp}
						onKeyUp={this.onChangeTimestampInput.bind(this)}
						onChange={this.onChangeTimestampInput.bind(this)}
						maxLength="14"
					/>
					
					<select name="type" ref="type" defaultValue="1" onChange={this.onChangeSelect.bind(this)}>
						<option value="1">мс</option>
						<option value="2">с</option>
					</select>
				</div>
				
			</div>
		);
	}
}

ReactDOM.render(<AppView />, document.getElementById('app'));