import React from 'react';
import ReactDOM from 'react-dom';

import {AppCnstns} from './constants.js';
import {AppHelpers} from './helpers.js';


class AppView extends React.Component {
	
	state = {
		tmstmp: 0,
		date: 0
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
		
		this.setState({
			date: vl,
			tmstmp: tmstmp
		})
	}
	
	onChangeTimestampInput(event) {
		let vl = event.target.value;
		let res = AppHelpers.parseTimestamp(vl);
		
		let date = res ? (res.date || '') : '';
		
		this.setState({
			date: date,
			tmstmp: vl
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
				
				<label className="app-label app-label--tmstmp">
					<input 
						type="text" 
						placeholder="Таймстамп" 
						ref="tmstmp" 
						value={this.state.tmstmp}
						onKeyUp={this.onChangeTimestampInput.bind(this)}
						onChange={this.onChangeTimestampInput.bind(this)}
						maxLength="14"
					/>
				</label>
				
			</div>
		);
	}
}

ReactDOM.render(<AppView />, document.getElementById('app'));