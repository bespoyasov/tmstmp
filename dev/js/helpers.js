/* 
	Форматы:
	0 — Сегодня, завтра, послезавтра, today, tomorrow;
	1 — 17 04 2016, 17.04.2016, 17/04/2016, 17 4 2016, 17 04 16 и т.д.;
	2 — 17 апреля 2016, 17 апр 2016, 17 april 2016, 1 день, 2 недели, 3 месяца, 5 лет и т.д.;
*/

import AppCnstns from './constants'


var AppHelpers = {
	
	// связь с вьюхой
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
		let tmstmpInt = parseInt(tmstmp) || 0;
		
		let res = {
			date: AppHelpers.getDateFromTimestamp(tmstmpInt),
			timestamp: tmstmpInt,
		}
		
		return res;
	},
	
	
	
	// определение формата
	parseDateFormat0: function(dateStr) {
		if (dateStr.indexOf('се') > -1 || dateStr.indexOf('tod') > -1) {
			return AppHelpers.getTodayDateAndTimestamp();
		}
		else if (dateStr.indexOf('пос') > -1) {
			return AppHelpers.getAfterTomorrowDateAndTimestamp();
		}
		else if ( (dateStr.indexOf('зав') > -1 && dateStr.indexOf('по') == -1) || dateStr.indexOf('tom') > -1) {
			return AppHelpers.getTomorrowDateAndTimestamp();
		}
		else if (dateStr.indexOf('позавч') > -1) {
			return AppHelpers.getBeforeYesterdayDateAndTimestamp();
		}
		else if (dateStr.indexOf('вче') > -1 || dateStr.indexOf('yest') > -1) {
			return AppHelpers.getYesterdayDateAndTimestamp();
		}
	},
	
	
	parseDateFormat1: function(dateStr) {		
		let d = dateStr.substr(0, dateStr.search(/\D/)).replace(/\D/g, '');
		let m = dateStr.substr(dateStr.search(/\D/), dateStr.search(/\D/)+1).replace(/\D/g, '');
		let y = dateStr.substr(dateStr.search(/\D/)+3).replace(/\D/g, '');
		
		let D = parseInt(d);
		let M = parseInt(m);
		let Y = parseInt(y);

		if (Y < 1000 || y == '') Y = (new Date).getFullYear();
		
		let tm = AppHelpers.getTimestampFromDate(D, M, Y);
		if (M > 11 || D > 31) tm = 0;
		
		let res = {
			date:dateStr,
			timestamp: tm
		}
		
		return res;
	},
	
	
	parseDateFormat2: function(dateStr) {
		
		// калькулятор
		let preRes = {
			date: dateStr
		};

		if (dateStr.indexOf('мин') > -1 || dateStr.indexOf('min') > -1) {
			preRes.timestamp = AppHelpers.getMSFor(1, dateStr);
		}
		else if (dateStr.indexOf('час') > -1 || dateStr.indexOf('hou') > -1) {
			preRes.timestamp = AppHelpers.getMSFor(2, dateStr);
		}
		else if (dateStr.indexOf('ден') > -1 || dateStr.indexOf('дн') > -1 || dateStr.indexOf('da') > -1) {
			preRes.timestamp = AppHelpers.getMSFor(3, dateStr);
		}
		else if (dateStr.indexOf('нед') > -1 || dateStr.indexOf('wee') > -1) {
			preRes.timestamp = AppHelpers.getMSFor(4, dateStr);
		}
		else if (dateStr.indexOf('мес') > -1 || dateStr.indexOf('mon') > -1) {
			preRes.timestamp = AppHelpers.getMSFor(5, dateStr);
		}
		else if (dateStr.indexOf('лет') > -1 || dateStr.indexOf('год') > -1 || dateStr.indexOf('yea') > -1) {
			preRes.timestamp = AppHelpers.getMSFor(6, dateStr);
		}
		
		if (preRes.timestamp) return preRes;
		
		// не калькулятор
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

		if (Y < 1000 || y == '') Y = (new Date).getFullYear();		
		
		let tm = AppHelpers.getTimestampFromDate(D, M, Y);
		if (D > 31) tm = 0;
		
		let res = {
			date:dateStr,
			timestamp: tm
		}
		
		return res;
	},
	


	// то оттуда или наоборот
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
	
	
	
	// для сегодня, завтра, послезавтра
	getTimestampOfStartDay: function(daysforward) {
		let now = new Date();
		let days = daysforward || 1;
		if (days == 4) days = 0;
		if (days == 5) days = -1;
		
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
	
	
	getYesterdayDateAndTimestamp: function() {
		let result = AppHelpers.getTimestampOfStartDay(4);
		return result;
	},
	
	getBeforeYesterdayDateAndTimestamp: function() {
		let result = AppHelpers.getTimestampOfStartDay(5);
		return result;
	},
	
	
	
	// количество миллисекунд
	getMSFor: function(type, dateStr) {
		let offset = 1000;
		
		switch (type) {
			case 1:
				offset *= 60;
				break;
			case 2:
				offset *= (60 * 60);
				break;
			case 3:
				offset *= (60 * 60 * 24);
				break;
			case 4:
				offset *= (60 * 60 * 24 * 7);
				break;
			case 5:
				offset *= (60 * 60 * 24 * 30);
				break;
			case 6:
				offset *= (60 * 60 * 24 * 365);
				break;
				
			default:
				offset = offset;
				break;
		}
		
		let nmbr = parseInt(dateStr.replace(/\D/g, ''));
		let ms = nmbr * offset;
		return ms;
	}
	
}

export {AppHelpers}