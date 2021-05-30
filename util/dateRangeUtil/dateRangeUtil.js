/**
 * 日期格式化
 * 使用 var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");  
 */
Date.prototype.Format = function(fmt) {  
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    /**
     * 日期范围工具类
     */
var dateRangeUtil = (function() {
    /***
     * 获得当前时间
     */
    this.getCurrentDate = function() {
        return new Date();
    };
    /***
     * 格式化日期数组
     */
    this.formatArray = function(startStop,format){
        if(format){
            startStop[0] = startStop[0].Format(format);
            startStop[1] = startStop[1].Format(format);
        }
        return startStop;
    }
    /***
     * 获得本周起止时间
     */
    this.getCurrentWeek = function(format) {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //返回date是一周中的某一天  
        var week = currentDate.getDay();
        //返回date是一个月中的某一天  
        var month = currentDate.getDate();

        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数  
        var minusDay = week != 0 ? week - 1 : 6;
        //alert(minusDay);  
        //本周 周一  
        var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
        //本周 周日  
        var sunday = new Date(monday.getTime() + (6 * millisecond));
        //添加本周时间  
        startStop.push(monday); //本周起始时间  
        //添加本周最后一天时间  
        startStop.push(sunday); //本周终止时间  
        //格式化，有format参数时 才会格式化
        startStop = this.formatArray(startStop,format);
        //返回  
        return startStop;
    };

    /***
     * 获得本月的起止时间
     */
    this.getCurrentMonth = function(format) {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //求出本月第一天  
        var firstDay = new Date(currentYear, currentMonth, 1);


        //当为12月的时候年份需要加1  
        //月份需要更新为0 也就是下一年的第一个月  
        if (currentMonth == 11) {
            currentYear++;
            currentMonth = 0; //就为  
        } else {
            //否则只是月份增加,以便求的下一月的第一天  
            currentMonth++;
        }


        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天  
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
        //求出上月的最后一天  
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

        //添加至数组中返回  
        startStop.push(firstDay);
        startStop.push(lastDay);

        //格式化，有format参数时 才会格式化
        startStop = this.formatArray(startStop,format);

        //返回  
        return startStop;
    };

    /**
     * 得到本季度开始的月份
     * @param month 需要计算的月份
     ***/
    this.getQuarterSeasonStartMonth = function(month) {
        var quarterMonthStart = 0;
        var spring = 0; //春  
        var summer = 3; //夏  
        var fall = 6; //秋  
        var winter = 9; //冬  
        //月份从0-11  
        if (month < 3) {
            return spring;
        }

        if (month < 6) {
            return summer;
        }

        if (month < 9) {
            return fall;
        }

        return winter;
    };

    /**
     * 获得该月的天数
     * @param year年份
     * @param month月份
     * */
    this.getMonthDays = function(year, month) {
        //本月第一天 1-31  
        var relativeDate = new Date(year, month, 1);
        //获得当前月份0-11  
        var relativeMonth = relativeDate.getMonth();
        //获得当前年份4位年  
        var relativeYear = relativeDate.getFullYear();

        //当为12月的时候年份需要加1  
        //月份需要更新为0 也就是下一年的第一个月  
        if (relativeMonth == 11) {
            relativeYear++;
            relativeMonth = 0;
        } else {
            //否则只是月份增加,以便求的下一月的第一天  
            relativeMonth++;
        }
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天  
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        //返回得到上月的最后一天,也就是本月总天数  
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
    };

    /**
     * 获得本季度的起止日期
     */
    this.getCurrentSeason = function() {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //获得本季度开始月份  
        var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);
        //获得本季度结束月份  
        var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;

        //获得本季度开始的日期  
        var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
        //获得本季度结束的日期  
        var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth));
        //加入数组返回  
        startStop.push(quarterSeasonStartDate);
        startStop.push(quarterSeasonEndDate);
        //返回  
        return startStop;
    };

    /***
     * 得到本年的起止日期
     * 
     */
    this.getCurrentYear = function(format) {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();

        //本年第一天  
        var currentYearFirstDate = new Date(currentYear, 0, 1);
        //本年最后一天  
        var currentYearLastDate = new Date(currentYear, 11, 31);
        //添加至数组  
        startStop.push(currentYearFirstDate);
        startStop.push(currentYearLastDate);

        //格式化，有format参数时 才会格式化
        startStop = this.formatArray(startStop,format);
        //返回  
        return startStop;
    };

    /**
     * 返回上一个月的第一天Date类型
     * @param year 年
     * @param month 月
     **/
    this.getPriorMonthFirstDay = function(year, month) {
        //年份为0代表,是本年的第一月,所以不能减  
        if (month == 0) {
            month = 11; //月份为上年的最后月份  
            year--; //年份减1  
            return new Date(year, month, 1);
        }
        //否则,只减去月份  
        month--;
        return new Date(year, month, 1);;
    };

    /**
     * 获得上一月的起止日期
     * ***/
    this.getPreviousMonth = function(format) {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //获得上一个月的第一天  
        var priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth);
        //获得上一月的最后一天  
        var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));
        //添加至数组  
        startStop.push(priorMonthFirstDay);
        startStop.push(priorMonthLastDay);

        //格式化，有format参数时 才会格式化
        startStop = this.formatArray(startStop,format);

        //返回  
        return startStop;
    };
    /**
     * 获得上上月的起止日期
     * ***/
    this.getPreviousMonth2 = function() {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //获得上一个月的第一天  
        var priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth);
        //获取上上月的第一天
        var priorMonthFirstDay2 = this.getPriorMonthFirstDay(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth());
        //获得上一月的最后一天  
        var priorMonthLastDay = new Date(priorMonthFirstDay2.getFullYear(), priorMonthFirstDay2.getMonth(), this.getMonthDays(priorMonthFirstDay2.getFullYear(), priorMonthFirstDay2.getMonth()));
        //添加至数组  
        startStop.push(priorMonthFirstDay2);
        startStop.push(priorMonthLastDay);
        //返回  
        return startStop;
    };


    /**
     * 获得上一周的起止日期
     * **/
    this.getPreviousWeek = function(format) {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //返回date是一周中的某一天  
        var week = currentDate.getDay();
        //返回date是一个月中的某一天  
        var month = currentDate.getDate();
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数  
        var minusDay = week != 0 ? week - 1 : 6;
        //获得当前周的第一天  
        var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));
        //上周最后一天即本周开始的前一天  
        var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
        //上周的第一天  
        var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));

        //添加至数组  
        startStop.push(priorWeekFirstDay);
        startStop.push(priorWeekLastDay);

        //格式化，有format参数时 才会格式化
        startStop = this.formatArray(startStop,format);

        return startStop;
    };

    /**
     * 获得上上周的起止日期
     * **/
    this.getPreviousWeek2 = function() {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //返回date是一周中的某一天  
        var week = currentDate.getDay();
        //返回date是一个月中的某一天  
        var month = currentDate.getDate();
        //一天的毫秒数  
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数  
        var minusDay = week != 0 ? week - 1 : 6;
        //获得当前周的第一天  
        var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));
        //上周最后一天即本周开始的前一天  
        var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond * 8);
        //上周的第一天  
        var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));

        //添加至数组  
        startStop.push(priorWeekFirstDay);
        startStop.push(priorWeekLastDay);

        return startStop;
    };

    /**
     * 得到上季度的起始日期
     * year 这个年应该是运算后得到的当前本季度的年份
     * month 这个应该是运算后得到的当前季度的开始月份
     * */
    this.getPriorSeasonFirstDay = function(year, month) {
        var quarterMonthStart = 0;
        var spring = 0; //春  
        var summer = 3; //夏  
        var fall = 6; //秋  
        var winter = 9; //冬  
        //月份从0-11  
        switch (month) { //季度的其实月份  
            case spring:
                //如果是第一季度则应该到去年的冬季  
                year--;
                month = winter;
                break;
            case summer:
                month = spring;
                break;
            case fall:
                month = summer;
                break;
            case winter:
                month = fall;
                break;

        };

        return new Date(year, month, 1);
    };

    /**
     * 得到上季度的起止日期
     * **/
    this.getPreviousSeason = function() {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11  
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        //上季度的第一天  
        var priorSeasonFirstDay = this.getPriorSeasonFirstDay(currentYear, currentMonth);
        //上季度的最后一天  
        var priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, this.getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2));
        //添加至数组  
        startStop.push(priorSeasonFirstDay);
        startStop.push(priorSeasonLastDay);
        return startStop;
    };

    /**
     * 得到去年的起止日期
     * **/
    this.getPreviousYear = function() {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        currentYear--;
        var priorYearFirstDay = new Date(currentYear, 0, 1);
        var priorYearLastDay = new Date(currentYear, 11, 31);
        //添加至数组  
        startStop.push(priorYearFirstDay);
        startStop.push(priorYearLastDay);
        return startStop;
    };
    /**
     * 得到前年的起止日期
     * **/
    this.getPreviousYear2 = function() {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var currentDate = this.getCurrentDate();
        //获得当前年份4位年  
        var currentYear = currentDate.getFullYear();
        currentYear -= 2;
        var priorYearFirstDay = new Date(currentYear, 0, 1);
        var priorYearLastDay = new Date(currentYear, 11, 31);
        //添加至数组  
        startStop.push(priorYearFirstDay);
        startStop.push(priorYearLastDay);
        return startStop;
    };
    /**
     * 得到几天前日期
     * **/
    this.getDateLater = function(n,format) {
        //起止日期数组  
        var startStop = new Array();
        //获取当前时间  
        var dateTemp = new Date();
        var dateEnd = dateTemp.getTime() + 1000 * 60 * 60 * 24 * n;
        dateTemp.setTime(dateEnd);
        //添加至数组  
        startStop.push(dateTemp);
        startStop.push(dateTemp);

        //格式化，有format参数时 才会格式化
        startStop = this.formatArray(startStop,format);

        return startStop;
    }


    /**
     * 显示日期范围选择弹窗 
     * e this
     * callback 点选时间段的回调函数 有两个参数 起始时间和结束时间
     * **/
    this.shwoDateSelect = function showDateEarly(e, callback) {
        e.focus();
        if(document.getElementById('date_check_content')){//如果弹窗已经存在 不继续append
            return
        }
        var htmlstr = '<div class="date_check_content" id="date_check_content">' + '<div class="date_div_first"><div onclick="changeTo(0,event)">今天</div><div onclick="changeTo(1,event)">昨天</div><div onclick="changeTo(2,event)">前天</div></div>' + '<div class="date_div_second"><div onclick="changeTo(3,event)">本周</div><div onclick="changeTo(4,event)">上周</div><div onclick="changeTo(5,event)">上上周</div></div>' + '<div><div onclick="changeTo(6,event)">本月</div><div onclick="changeTo(7,event)">上月</div><div onclick="changeTo(8,event)">上上月</div></div>' + '<div class="date_div_last"><div onclick="changeTo(9,event)">本年</div><div onclick="changeTo(10,event)">去年</div><div onclick="changeTo(11,event)">前年</div></div>' + '</div>'
        e.innerHTML += htmlstr;
        this.callback = callback;
    }

    function removeElement(_element) {
        if (!_element) {
            return;
        }
        var _parentElement = _element.parentNode;
        if (_parentElement) {
            _parentElement.removeChild(_element);
        }
    }

    this.hideDateSelect = function hideDateEarly() {
        removeElement(document.getElementById('date_check_content'));
    }

    function stopPropagation(e) {
        e = e || window.event;
        if (e.stopPropagation) { //W3C阻止冒泡方法  
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //IE阻止冒泡方法  
        }
    }

    this.changeTo = function changeTo(id, event) {
        stopPropagation(event)
        var start = new Date();
        var end = new Date();
        switch (id) {
            case 0:
                break;
            case 1:
                start = this.getDateLater(-1)[0];
                end = this.getDateLater(-1)[1];
                break;
            case 2:
                start = this.getDateLater(-2)[0];
                end = this.getDateLater(-2)[1];
                break;
            case 3:
                start = this.getCurrentWeek()[0];
                end = this.getCurrentWeek()[1];
                break;
            case 4:
                start = this.getPreviousWeek()[0];
                end = this.getPreviousWeek()[1];
                break;
            case 5:
                start = this.getPreviousWeek2()[0];
                end = this.getPreviousWeek2()[1];
                break;
            case 6:
                start = this.getCurrentMonth()[0];
                end = this.getCurrentMonth()[1];
                break;
            case 7:
                start = this.getPreviousMonth()[0];
                end = this.getPreviousMonth()[1];
                break;
            case 8:
                start = this.getPreviousMonth2()[0];
                end = this.getPreviousMonth2()[1];
                break;
            case 9:
                start = this.getCurrentYear()[0];
                end = this.getCurrentYear()[1];
                break;
            case 10:
                start = this.getPreviousYear()[0];
                end = this.getPreviousYear()[1];
                break;
            case 11:
                start = this.getPreviousYear2()[0];
                end = this.getPreviousYear2()[1];
                break;
            default:

        }

        this.hideDateSelect();

        if (typeof(this.callback) == 'function') {
            this.callback(start, end);
        }
        // console.log(start.Format("yyyy-MM-dd"));
        // console.log(end.Format("yyyy-MM-dd"))
    }
    return this;
})();

//*************************************************使用方法***********************************************************
// 要添加下拉窗的element添加如下属性：
// 1. class="date_check_main"
// 2. tabindex="0"
// 3. onblur="dateRangeUtil.hideDateSelect()"
// 4. 点击方法 例如：
//      1.angular: ng-click="chooseDate($event)"
//controller 中添加
// $scope.chooseDate = function(e){
//     dateRangeUtil.shwoDateSelect(e.target,function(start,end){
//         $scope.vo.startdate = start.Format("yyyy-MM-dd");
//         $scope.vo.enddate = end.Format("yyyy-MM-dd");//
//         $scope.$apply();
//     })
// }

//      2.js/jquery: onclick="dateRangeUtil.shwoDateSelect(this,chooseDate)"
// function chooseDate(start, end){
//         console.log(start+','+end);
// }


//tabindex="0" onblur="dateRangeUtil.hideDateSelect()" ng-click="chooseDate($event)"


// $scope.chooseDate = function(e){
//     dateRangeUtil.shwoDateSelect(e.target,function(start,end){
//         $("#start_date").val(start.Format("yyyy-MM-dd"));
//         $("#end_date").val(end.Format("yyyy-MM-dd"));
//     })
// }

// $scope.chooseDate = function(e){
//     dateRangeUtil.shwoDateSelect(e.target,function(start,end){
//         $scope.vo.startdate = start.Format("yyyy-MM-dd");
//         $scope.vo.enddate = end.Format("yyyy-MM-dd");//默认到货日期为当天日期
//         $scope.$apply();
//     })
// }


var lunarDate = function(){

    var sWeek = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var dNow = new Date();
    var CalendarData = new Array(100);
    var madd = new Array(12);
    var tgString = "甲乙丙丁戊己庚辛壬癸";
    var dzString = "子丑寅卯辰巳午未申酉戌亥";
    var numString = "一二三四五六七八九十";
    var monString = "正二三四五六七八九十冬腊";
    var weekString = "日一二三四五六";
    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    var cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B,
        0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F,
        0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    function GetBit(m, n) {
        return (m >> n) & 1; }

    function e2c() {
        TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
        var total, m, n, k;
        var isEnd = false;
        var tmp = TheDate.getFullYear();
        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
        if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) { total++; }
        for (m = 0;; m++) { k = (CalendarData[m] < 0xfff) ? 11 : 12;
            for (n = k; n >= 0; n--) {
                if (total <= 29 + GetBit(CalendarData[m], n)) { isEnd = true;
                    break; }
                total = total - 29 - GetBit(CalendarData[m], n); }
            if (isEnd) break; }
        cYear = 1921 + m;
        cMonth = k - n + 1;
        cDay = total;
        if (k == 12) {
            if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) { cMonth = 1 - cMonth; }
            if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) { cMonth--; } }
    }

    function GetcDateString() {
        var tmp = "";
        tmp += tgString.charAt((cYear - 4) % 10);
        tmp += dzString.charAt((cYear - 4) % 12);
        tmp += "年 ";
        if (cMonth < 1) { tmp += "(闰)";
            tmp += monString.charAt(-cMonth - 1); } else { tmp += monString.charAt(cMonth - 1); }
        tmp += "月";
        tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
        if (cDay % 10 != 0 || cDay == 10) { tmp += numString.charAt((cDay - 1) % 10); }
        return tmp;
    }

    function GetLunarDay(solarYear, solarMonth, solarDay) {
        if (solarYear < 1921 || solarYear > 2020) {
            return "";
        } else { solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
            e2c(solarYear, solarMonth, solarDay);
            return GetcDateString(); }
    }
    var D = new Date();
    var yy = D.getFullYear();
    var mm = D.getMonth() + 1;
    var dd = D.getDate();
    var ww = D.getDay();
    var ss = parseInt(D.getTime() / 1000);

    function getFullYear(d) { // 修正firefox下year错误
        yr = d.getYear();
        if (yr < 1000)
            yr += 1900;
        return yr;
    }

    function getTimeRange(){
        var hourNow = dNow.getHours();
        var ranges = new Array('早上','中午','下午','晚上');
        var timeIndex = 0;
        if(hourNow>=0&&hourNow<=11){

        }
        if(hourNow>11&&hourNow<=13){
            timeIndex = 1;
        }
        if(hourNow>13&&hourNow<=18){
            timeIndex = 2;
        }
        if(hourNow>18&&hourNow<=23){
            timeIndex = 3;
        }
        return ranges[timeIndex];
    }

    this.getLunar = function() {
        var timeArr = new Array();
        var sValue = getFullYear(dNow) + "年" + (dNow.getMonth() + 1) + "月" + dNow.getDate() + "日" + " " + sWeek[dNow.getDay()] + " ";

        timeArr.push(getTimeRange());
        timeArr.push(sValue);
        timeArr.push(GetLunarDay(yy, mm, dd));
        
        return timeArr;
    };
    
}
