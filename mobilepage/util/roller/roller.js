/**
 * [roller description]
 * @type {Object}
 */
var roller = {
	_rollStart: 250,		//起始角度
	_rollEnd: 355,			//终止角度 防止速度达不到最大速度 回转了 这个值要小于360 
	_speedMax: 280,			//最大间隔，对应最慢速度，根据速度判断终止
	_timeoutId: null,
	_race: 900,				//速度变化
	_maxTimeout: 2500, 	//最长转动时间 万一不停下来 就靠这个了
	_maxTimeoutId: null,
	_isMaxTimeout: false,

	rollNow: 250,			//当前转动的角度
	speed: 0,				//起始转动 时间间隔 ms
	callback: null,			//转动结束后的回调
	stopIndex: 0,			//转动结束位置
	currentIndex: 0,		//当前位置，起始位置
	rander: null			//当前位置改变时，的渲染函数，有当前位置currentIndex参数
}
/**
 * 初始化
 * @Author   SunXinqiang
 * @DateTime 2017-09-14
 * @param    {number}    	start    	起始
 * @param    {number}    	endIdx   	结束
 * @param    {function}    	rander   	渲染函数 有当前index参数
 * @param    {function}  	callback   	执行结束回调
 * @return   {null}             
 */
roller.init = function(start,endIdx,rander,callback){
	this.stopIndex = endIdx;
	this.currentIndex = start;
	this.rander = rander;
	this.callback = callback;
	clearTimeout(this._maxTimeoutId);
	this._maxTimeoutId = null;
	this._isMaxTimeout = false;
}
/**
 * 重置
 * @Author   SunXinqiang
 * @DateTime 2017-09-14
 * @return   {[type]}    [description]
 */
roller.reset = function(){
	this.rollNow = this._rollStart;
	this.speed = 0;
	this.callback = null;
	this.stopIndex = 0;
	this.currentIndex = 0;
	this.rander = null;
	clearTimeout(this._maxTimeoutId);
	this._maxTimeoutId = null;
	this._isMaxTimeout = false;
}
/**
 * 滚动
 * @Author   SunXinqiang
 * @DateTime 2017-09-14
 * @return   {[type]}    [description]
 */
roller.roll = function(){
	clearTimeout(this._timeoutId);
	if(this.isEnd()){
		var callback = this.callback;
		this.reset();
		callback();
		return;
	}
	if(this.currentIndex==8){
		this.currentIndex = 1
	}else{
		this.currentIndex++;
	}
	this.rander(this.currentIndex);
	this.rollNow += 1;
	this.getSpeed();
	this._timeoutId = setTimeout(this.roll.bind(this),this.speed);
	var that = this;
	if(!this._maxTimeoutId){
		this._maxTimeoutId = setTimeout(function(){
			that._isMaxTimeout = true;
		},this._maxTimeout);
	}
}

/**
 * 判断是否结束
 * @Author   SunXinqiang
 * @DateTime 2017-09-14
 * @return   {Boolean}   [description]
 */
roller.isEnd = function(){
	//当前转到的奖项不是中奖项 返回false未结束
	if(this.currentIndex!=this.stopIndex){
		return false;
	}
	//超时了 已经转到中奖项 结束
	if(this._isMaxTimeout){
		console.log('timeout');
		return true;
	}
	// 熟读达到最慢速度 结束
	if(this.speed>=this._speedMax){
		console.log('_speedMax');
		return true;
	}
	//转动角度 达到最大角度
	if(this.rollNow>this._rollEnd){
		console.log('_rollEnd')
		return true;
	}
	return false;
}

/**
 * 设置时间间隔
 * @Author   SunXinqiang
 * @DateTime 2017-09-14
 * @return   {[type]}    [description]
 */
roller.getSpeed = function(){
	this.speed =  Math.sin( this.rollNow*Math.PI/180 )*this._race +this._race+30;
}