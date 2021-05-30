"use strict"
!function() {
	tempApp.factory('dateUtil', function() {
		var factory = {};
		/**
		 * 获取当前日期加上天数后的新日期.
		 */
		factory.getDateAfter = function(days) {
			var nd = new Date();
			nd = nd.valueOf();
			nd = nd + days * 24 * 60 * 60 * 1000;
			nd = new Date(nd);
			var y = nd.getFullYear();
			var m = nd.getMonth() + 1;
			var d = nd.getDate();
			if (m <= 9)
				m = "0" + m;
			if (d <= 9)
				d = "0" + d;
			var cdate = y + "-" + m + "-" + d;
			return cdate;
		}
		/**
		 * 获取指定日期加上天数后的新日期.
		 */
		factory.getDateAfter2 = function(date,days) {
			var nd = new Date(date);
			nd = nd.valueOf();
			nd = nd + days * 24 * 60 * 60 * 1000;
			nd = new Date(nd);
			var y = nd.getFullYear();
			var m = nd.getMonth() + 1;
			var d = nd.getDate();
			if (m <= 9)
				m = "0" + m;
			if (d <= 9)
				d = "0" + d;
			var cdate = y + "-" + m + "-" + d;
			return cdate;
		}
		/**
		 * 获取当前日期.
		 */
		factory.getDate1 = function() {
			var nd = new Date();
			var y = nd.getFullYear();
			var m = nd.getMonth() + 1;
			var d = nd.getDate();
			var s = nd.getSeconds();
			if (m <= 9)
				m = "0" + m;
			if (d <= 9)
				d = "0" + d;
			if (s <= 9)
				s = "0" + s;
			var cdate = y + "-" + m + "-" + d;
			cdate = cdate+ " " + nd.getHours() + ":" + nd.getMinutes()
            + ":" + s;
			return cdate;
		}
		/**
		 * 获取当前日期.
		 */
		factory.getDate2 = function() {
			var nd = new Date();
			var y = nd.getFullYear();
			var m = nd.getMonth() + 1;
			var d = nd.getDate();
			if (m <= 9)
				m = "0" + m;
			if (d <= 9)
				d = "0" + d;
			var cdate = y + "-" + m + "-" + d;
			return cdate;
		}
		
		/**
		 * 获取当前时间戳.
		 */
		factory.getTs = function() {
			var nd = new Date();
			return nd.valueOf();
		}
		return factory;
	});
}()