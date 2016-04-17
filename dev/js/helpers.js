/* 
	Форматы:
	0 — Сегодня, завтра, послезавтра, today, tomorrow;
	1 — 17 04 2016, 17.04.2016, 17/04/2016, 17 4 2016, 17 04 16 и т.д.;
	2 — 17 апреля 2016, 17 апр 2016, 17 april 2016;
*/

import AppCnstns from './constants'


var AppHelpers = {
	
	parseDate: function(date) {
		let dateStr = date.toString().toLowerCase();
		
		if (dateStr.search(/[a-zA-Zа-яА-Я]/g) == -1) {
			return AppHelpers.parseDateFormat1(dateStr);
		}
		else if (dateStr.search(/\d/g) == -1) {
			return AppHelpers.parseDateFormat0(dateStr);
		}
		else {
			return AppHelpers.parseDateFormat2(dateStr);
		}
	},
	
	parseTimestamp: function(tmstmp) {
		let tmstmpInt = parseInt(tmstmp);
		
		let res = {
			date: AppHelpers.getDateFromTimestamp(tmstmpInt),
			timestamp: tmstmpInt,
		}
		
		return res;
	},
	
	
	
	parseDateFormat0: function(dateStr) {
		if (dateStr.indexOf('се') > -1 || dateStr.indexOf('tod') > -1) {
			return AppHelpers.getTodayDateAndTimestamp();
		}
		else if (dateStr.indexOf('пос') > -1) {
			return AppHelpers.getAfterTomorrowDateAndTimestamp();
		}
		else if (dateStr.indexOf('зав') > -1 || dateStr.indexOf('tom') > -1) {
			return AppHelpers.getTomorrowDateAndTimestamp();
		}
	},
	
	
	parseDateFormat1: function(dateStr) {		
		let d = dateStr.substr(0, dateStr.search(/\D/)).replace(/\D/g, '');
		let m = dateStr.substr(dateStr.search(/\D/), dateStr.search(/\D/)+1).replace(/\D/g, '');
		let y = dateStr.substr(dateStr.search(/\D/)+3).replace(/\D/g, '');
		
		let D = parseInt(d);
		let M = parseInt(m);
		let Y = parseInt(y);
		
		if (Y < 10) Y = parseInt('200'+Y);
		else if (Y < 50) Y = parseInt('20'+Y);
		else if (Y < 100) Y = parseInt('19'+Y);
		else if (Y < 1000) Y = parseInt('1'+Y);
		
		let res = {
			date:dateStr,
			timestamp: AppHelpers.getTimestampFromDate(D, M, Y)
		}
		
		return res;
	},
	
	
	parseDateFormat2: function(dateStr) {
		let d = dateStr.substr(0, dateStr.search(/\s/));
		let m = dateStr.substr(dateStr.search(/\s/)).replace(/\d/g, '').replace(/\s/g, '');
		let y = dateStr.substr(dateStr.search(/\s/)).replace(/\D/g, '').replace(/\s/g, '');
		
		let months = AppCnstns.months,
			monthsEng = AppCnstns.monthsEng,
			month = '',
			idx = -1;
			
		for (let i in months) {
			let itm = months[i];
			if (m.indexOf(itm) > -1) idx = i;
		}
		
		if (idx == -1) {
			for (let i in monthsEng) {
				let itm = monthsEng[i];
				if (m.indexOf(itm) > -1) idx = i;
			}
		}
		
		let D = parseInt(d);
		let M = parseInt(idx);
		let Y = parseInt(y);
		
		if (Y < 50) Y = parseInt('20'+Y);
		else if (Y < 100) Y = parseInt('19'+Y);
		
		let res = {
			date:dateStr,
			timestamp: AppHelpers.getTimestampFromDate(D, M, Y)
		}
		
		return res;
	},
	


	getDateFromTimestamp: function(tmstmp) {
		let tmstmpInt = parseInt(tmstmp);
		let dt = new Date();
		dt.setTime(tmstmpInt);
		
		let d = parseInt(dt.getDate());
		if (d < 10) d = '0' + d.toString();
		d += ' ';
		
		let m = parseInt(dt.getMonth()) + 1;
		if (m < 10) m = '0' + m.toString();
		m += ' ';
		
		let y = parseInt(dt.getFullYear());
		
		return ''.concat(d,m,y);
	},
	
	
	getTimestampFromDate: function(D, M, Y) {
		let dt = new Date();
		dt.setDate(D);
		dt.setMonth(M-1);
		dt.setYear(Y);

		let startOfDay = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
		return startOfDay.getTime();
	},
	
	
	
	getTimestampOfStartDay: function(daysforward) {
		let now = new Date();
		let days = daysforward || 1;
		
		let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		startOfDay = startOfDay.getTime() + (days-1)*86400000;
		
		let result = {
			timestamp: startOfDay,
			date: AppHelpers.getDateFromTimestamp(startOfDay),
		}
		
		return result;
	},
	
	
	getTodayDateAndTimestamp: function() {
		let result = AppHelpers.getTimestampOfStartDay(1);
		return result;
	},
	
	
	getTomorrowDateAndTimestamp: function() {
		let result = AppHelpers.getTimestampOfStartDay(2);
		return result;
	},
	
	
	getAfterTomorrowDateAndTimestamp: function() {
		let result = AppHelpers.getTimestampOfStartDay(3);
		return result;
	},
	
}

export {AppHelpers}