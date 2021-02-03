

var NBPT_COLOR = {

	red: "#da432a",
	lightRed: "#ff0000",
	yellow: "#e9d97f",
	green: '#4c9d62',
	orange: '#ebad8e',
	blue: '#89afd3',
	blueChambray: '#4a6a78'

};


var ecObj = {
	eLine : null,	//指标数据图表
	eChinaMap: null,	//全国地图
	eProvinceMap: null,	//省地图
	eNesBar: null		//网元排名
};


$(function (){

	ecObj.eChinaMap = addCE($("#ec-score-china")[0],getEcChinaOption());
	randomEcChina(ecObj.eChinaMap, '全国测试情况');

	ecObj.eNesBar = addCE($("#ec-nes-bar")[0],getECNesBarOption());

	randomEcNesBar(ecObj.eNesBar, '全国各网元评分情况');


	ecObj.eLine = addCE($("#ec_line")[0],getSingleLineSYOption());


	ecObj.eChinaMap.on("click", function(params){
		randomEcNesBar(ecObj.eNesBar, params.name+'各网元评分情况');
		ecObj.eLine = addCE($("#ec_line")[0],getSingleLineSYOption());
	});

	ecObj.eNesBar.on("click", function(params){
		ecObj.eLine = addCE($("#ec_line")[0],getSingleLineSYOption());
	});

});

/**
 * 初始化百度图标
 * @param u 标签ID
 * @param u_data 数据源
 */
function addCE(u, u_data) {
	var argCount = arguments.length;
	//第一次加载
	if (argCount == 2) {

		var myChart = echarts.init(u);
		myChart.showLoading({
			text: '加载中...'    //loading话术
		});
		setTimeout(function() {
			myChart.hideLoading();
			myChart.setOption(u_data);
		}, 500);

		return myChart; //用于每一个点击事件
	}
	//图表联动
	if (argCount == 3 && arguments[2] == "ctTurn") {
		var myChart = echarts.init(u);
		myChart.setOption(u_data);
		return myChart; //用于每一个点击事件
	}
}


//产生随机地图数据-全国
function randomEcChina(ecObj, title){

	var pArr = ['北京', '天津', '上海', '重庆', '河北', '河南', '云南', '辽宁', '黑龙江', '湖南', '安徽', '山东', '新疆', '江苏', '浙江', '江西', '湖北', '广西', '甘肃', '山西', '内蒙古', '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏', '四川', '宁夏', '海南', '台湾', '香港', '澳门']


	var _newS =  [
		{
			name     : '各省网元测试质量评分',
			type     : 'map',
			mapType  : 'china',
			roam     : false,
			itemStyle: {
				normal  : {label: {show: true}},
				emphasis: {label: {show: true}}
			},
			data     : (function(){
				var d = [];
				for(var i=0;i<pArr.length;i++){
					var _num = Math.round(Math.random() * 100);
					var _j = {
						name: pArr[i], value: _num, tooltip: {
							trigger  : 'item',
							formatter: pArr[i] +
							"<br>" + "省综合评分："+ _num
						}
					};
					d.push(_j);
				}

				return d;
			})()

		}];

	ecObj.showLoading({
		text: '加载中...'    //loading话术
	});
	setTimeout(function() {
		ecObj.hideLoading();
		//ecObj.setSeries(_newS);
		ecObj.setOption(
			{
				title: {
					text: title
				},
				series: _newS
			}
		);
	}, 500);


};

function getEcChinaOption(){
	var _option = {
		title : {
			text: '全国测试概况'
		},
		tooltip : {
			trigger: 'item',
			textStyle: {
				align:'left'
			}
		},
		dataRange: {
			min: 0,
			max: 100,
			x: 'left',
			y: 'bottom',
			splitNumber:3,
			color: ['#00bf71','#ff991b','#dd2306'],
			formatter : function(v, v2){
				if (v2 >= 70) { return '> 70'}      //value 100
				else if (v2 > 40 && v2 < 70) { return '40 ~ 70'}      //value 100
				else if (v2 <= 40) { return '< 40'}      //value 100
			}
		},
		series : [
			/*{
			 name: '各省业务测试质量评分',
			 type: 'map',
			 mapType: 'china',
			 roam: false,
			 itemStyle:{
			 normal:{label:{show:true}},
			 emphasis:{label:{show:true}}
			 },
			 data:[
			 {name: '北京',value: Math.round(Math.random()*100),tooltip:{
			 trigger:'item',
			 formatter:"北京"+
			 "<br>"+"显示信息文字"
			 }},
			 {name: '天津',value: Math.round(Math.random()*100)},
			 {name: '上海',value: Math.round(Math.random()*100)},
			 {name: '重庆',value: Math.round(Math.random()*100)},
			 {name: '河北',value: Math.round(Math.random()*100)},
			 {name: '河南',value: Math.round(Math.random()*100)},
			 {name: '云南',value: Math.round(Math.random()*100)},
			 {name: '辽宁',value: Math.round(Math.random()*100)},
			 {name: '黑龙江',value: Math.round(Math.random()*100)},
			 {name: '湖南',value: Math.round(Math.random()*100)},
			 {name: '安徽',value: Math.round(Math.random()*100)},
			 {name: '山东',value: Math.round(Math.random()*100)},
			 {name: '新疆',value: Math.round(Math.random()*100)},
			 {name: '江苏',value: Math.round(Math.random()*100)},
			 {name: '浙江',value: Math.round(Math.random()*100)},
			 {name: '江西',value: Math.round(Math.random()*100)},
			 {name: '湖北',value: Math.round(Math.random()*100)},
			 {name: '广西',value: Math.round(Math.random()*100)},
			 {name: '甘肃',value: Math.round(Math.random()*100)},
			 {name: '山西',value: Math.round(Math.random()*100)},
			 {name: '内蒙古',value: Math.round(Math.random()*100)},
			 {name: '陕西',value: Math.round(Math.random()*100)},
			 {name: '吉林',value: Math.round(Math.random()*100)},
			 {name: '福建',value: Math.round(Math.random()*100)},
			 {name: '贵州',value: Math.round(Math.random()*100)},
			 {name: '广东',value: Math.round(Math.random()*100)},
			 {name: '青海',value: Math.round(Math.random()*100)},
			 {name: '西藏',value: Math.round(Math.random()*100)},
			 {name: '四川',value: Math.round(Math.random()*100)},
			 {name: '宁夏',value: Math.round(Math.random()*100)},
			 {name: '海南',value: Math.round(Math.random()*100)},
			 {name: '台湾',value: Math.round(Math.random()*100)},
			 {name: '香港',value: Math.round(Math.random()*100)},
			 {name: '澳门',value: Math.round(Math.random()*100)}
			 ]
			 }*/
		]
	}
	return _option;
}


function getECNesBarOption(){

	//var sArr =['GZMME1201BEr','GZSAEGW1201BEr','GZMME1301BEr','GZMME1304BEr','GZMME1306BEr','GZSAEGW1301BEr','GZMME1200BEr','GZMME1909BEr','GZMME098BEr','GZMME1100BEr'];
	var sArr;
	var type = $(".widget-level-item.active").find(".level-title").html();
	if(type == "仿真ENODEB"){
		sArr =['GZMME001BEr','GZMME008BEr','GZMME018BEr','GZMME021BEr','GZMME032BEr','GZMME044BEr','GZMME051BEr','GZMME064BEr','GZMME057BEr','GZMME086BEr'];
	}else if(type == '仿真MME'){
		sArr =['GZSAEGW1301BEr','GZSAEGW1302BEr','GZSAEGW1303BEr','GZSAEGW1305BEr','GZSAEGW1306BEr','GZSAEGW1307BEr','GZSAEGW1311BEr','GZSAEGW1332BEr','GZSAEGW1431BEr','GZSAEGW1753BEr'];
	}




	var option = {
		title: {
			text: '各网元评分情况'
		},
		color:[ NBPT_COLOR.green],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
			formatter: "{a} <br/>{b} : {c} 分"
		},
		grid: {
			x: '30%',
			y: '15%',
			x2: '10%',
			y2: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01],
			splitLine: false
		},
		yAxis: {
			type: 'category',
			data: sArr,
			splitLine: false
		},
		series: [
			{
				name: '评分',
				type: 'bar',
				itemStyle: {
					normal: {
						label : {
							show: true, position: 'insideTop'
						}
					},
					emphasis:{
						label : {
							show: true, position: 'insideTop'
						}
					}
				},
				data: (function(){
					var d = [];
					for(var i=0; i<sArr.length; i++){
						d.push(parseInt(70*Math.random())+30);
					}
					d.sort();
					console.log(d);
					return d;
				})()
			}
		]
	};

	return option;

}

//随机刷新网元数据列表
function randomEcNesBar(ecObj, title){
	var sArr;

	var type = $(".widget-level-item.active").find(".level-title").html();
	if(type == "仿真ENODEB"){
		sArr =['GZMME001BEr','GZMME008BEr','GZMME018BEr','GZMME021BEr','GZMME032BEr','GZMME044BEr','GZMME051BEr','GZMME064BEr','GZMME057BEr','GZMME086BEr'];
	}else if(type == '仿真MME'){
		sArr =['GZSAEGW1301BEr','GZSAEGW1302BEr','GZSAEGW1303BEr','GZSAEGW1305BEr','GZSAEGW1306BEr','GZSAEGW1307BEr','GZSAEGW1311BEr','GZSAEGW1332BEr','GZSAEGW1431BEr','GZSAEGW1753BEr'];
	}


	var _newS =  [
		{
			name: '评分',
			type: 'bar',
			itemStyle: {
				normal: {
					label : {
						show: true, position: 'insideTop'
					}
				},
				emphasis:{
					label : {
						show: true, position: 'insideTop'
					}
				}
			},
			data: (function(){
				var d = [];
				for(var i=0; i<sArr.length; i++){
					d.push(parseInt(70*Math.random())+30);
				}
				d.sort();
				console.log(d);
				return d;
			})()

		}];

	ecObj.showLoading({
		text: '加载中...'    //loading话术
	});
	setTimeout(function() {
		ecObj.hideLoading();
		//ecObj.setSeries(_newS);
		var option = {
			title: {
				text: title
			},
			yAxis: [{
				data: sArr
			}],
			series: _newS
		};
		ecObj.setOption(option);
	}, 500);

};






//*********************  Start line init Data   *********************

var _color = {
	_lGreen: '#b4f1c2',
	_Green: '#61cc79',
	_dGreen: '#03a000',
	_lBlue: '#cde6f3',
	_Blue: '#73c0e3',
	_dBlue: '#0091d4'
};


function _getTestXAxisData(){
	var d = [];
	for(var i=0;i<24;i++){
		i<10? d.push("2016-06-16 0"+ i+":00"):d.push("2016-06-16 "+ i+":00");
	}
	for(var i=0;i<24;i++){
		i<10? d.push("2016-06-17 0"+ i+":00"):d.push("2016-06-17 "+ i+":00");
	}
	for(var i=0;i<24;i++){
		i<10? d.push("2016-06-18 0"+ i+":00"):d.push("2016-06-18 "+ i+":00");
	}
	for(var i=0;i<24;i++){
		i<10? d.push("2016-06-19 0"+ i+":00"):d.push("2016-06-19 "+ i+":00");
	}
	for(var i=0;i<24;i++){
		i<10? d.push("2016-06-20 0"+ i+":00"):d.push("2016-06-20 "+ i+":00");
	}
	return d;
}

function _getTestSeriesData(){
	var d = [];
	for(var i=0;i<24;i++){
		d.push(parseInt(100*Math.random()))
	}
	for(var i=0;i<24;i++){
		d.push(parseInt(100*Math.random()))
	}
	for(var i=0;i<24;i++){
		d.push(parseInt(100*Math.random()))
	}
	for(var i=0;i<24;i++){
		d.push(parseInt(100*Math.random()))
	}
	for(var i=0;i<24;i++){
		d.push(parseInt(100*Math.random()))
	}
	return d;
};


//时延
function getSingleLineSYOption(){

	var option = {
		dataZoom  : {
			show               : true,
			start              : 0,
			backgroundColor    : 'rgb(242,242,242)',
			dataBackgroundColor: 'rgb(207,207,207)',
			fillerColor        : 'rgba(0,183,17,0.3)'
		},
		color     : [_color._Green, _color._dGreen],
		grid      : {
			borderWidth: 0,
			x          : 55,
			y          : 50,
			x2         : 55,
			y2         : 70
		},
		title     : {
			show: false
		},
		tooltip   : {
			trigger        : 'axis',
			backgroundColor: '#ffffff',
			borderWidth    : '1',
			borderColor    : '#d9d9d9',
			axisPointer    : {
				lineStyle: {
					color: '#949494',
					width: 1,
					type : 'solid'
				}
			},
			textStyle      : {
				color   : '#666',
				fontSize: 12
			},
			formatter      : function(a){
				var _sn = a[0].seriesName;
				var _n = a[0].name;
				var _v = a[0].value;
				return _n+"<br>"+_sn +"：" +_v+"ms";
				/* if(_v<60){
				 return _sn+"<br>"+_n+" <span style='color:red'>" + _v + "%</span>";
				 }else{
				 return _sn+"<br>"+_n+" <span style='color:green'>" + _v + "%</span>";
				 }*/
				/*  if(_v<60){
				 return _sn+"<br>"+_n+" <span style='color:red'>" + _v + "%</span>";
				 }else{
				 return _sn+"<br>"+_n+" <span style='color:green'>" + _v + "%</span>";
				 }*/
			}
		},
		legend    : {
			show: true,
			x:'right',
			selectedMode:false,
			data: ['时延']
		},
		toolbox   : {
			show: false
		},
		calculable: true,
		xAxis     : [
			{

				type       : 'category',
				boundaryGap: false,
				data       : _getTestXAxisData(),
				splitLine  : 0,
				axisLine   : {
					lineStyle: {
						color: '#f4f3f4',
						width: 1,
						type : 'solid'
					}
				},
				lineStyle  : {
					color: '#000'
				}
			}
		],
		yAxis     : [
			{
				type       : 'value',
				position   : 'right',
				max        : '100',
				min        : '0',
				splitNumber: '1',
				splitLine  : 0,
				axisLine   : {
					lineStyle: {
						color: '#f4f3f4',
						width: 1,
						type : 'solid'
					}
				},
				axisLabel : {
					formatter: '{value}ms'
				}
			}
		],
		series    : [
			{
				name     : '时延',
				type     : 'line',
				smooth   : true,
				symbolSize: 1,
				color    : '#000',
				itemStyle: {
					normal: {
						areaStyle: {
							type : 'default',
							color: _color._lGreen
						},
						lineStyle:{
							color: _color._Green,
							width: 2,
							type : 'solid'
						}
					}
				},
				data     : _getTestSeriesData()
			}

		]
	};
	return option;
}
//丢包率
function getSingleLineDBLOption(){

	var option = {
		dataZoom  : {
			show               : true,
			start              : 0,
			backgroundColor    : 'rgb(242,242,242)',
			dataBackgroundColor: 'rgb(207,207,207)',
			fillerColor        : 'rgba(0,145,212,0.2)'
		},
		color     : [_color._Blue, _color._dBlue],
		grid      : {
			borderWidth: 0,
			x          : 55,
			y          : 50,
			x2         : 55,
			y2         : 70
		},
		title     : {
			show: false
		},
		tooltip   : {
			trigger        : 'axis',
			backgroundColor: '#ffffff',
			borderWidth    : '1',
			borderColor    : '#d9d9d9',
			axisPointer    : {
				lineStyle: {
					color: '#949494',
					width: 1,
					type : 'solid'
				}
			},
			textStyle      : {
				color   : '#666',
				fontSize: 12
			},
			formatter      : function(a){
				var _sn = a[0].seriesName;
				var _n = a[0].name;
				var _v = a[0].value;
				return _n+"<br>"+_sn +"：" +_v+"%";
				//return _sn+"<br>"+_n+" <span style='color:"+_color._Blue+"'>" + _v + "s</span> ";
			}
		},
		legend    : {
			show: true,
			x:'right',
			selectedMode:false,
			data: ['丢包率']
		},
		toolbox   : {
			show: false
		},
		calculable: true,
		xAxis     : [
			{

				type       : 'category',
				boundaryGap: false,
				data       : _getTestXAxisData(),
				splitLine  : 0,
				axisLine   : {
					lineStyle: {
						color: '#f4f3f4',
						width: 1,
						type : 'solid'
					}
				},
				lineStyle  : {
					color: '#000'
				}
			}
		],
		yAxis     : [
			{
				type       : 'value',
				position   : 'right',
				max        : '100',
				min        : '0',
				splitNumber: '1',
				splitLine  : 0,
				axisLine   : {
					lineStyle: {
						color: '#f4f3f4',
						width: 1,
						type : 'solid'
					}
				},
				axisLabel : {
					formatter: '{value}%'
				}
			}
		],
		series    : [
			{
				name     : '丢包率',
				type     : 'line',
				smooth   : true,
				symbolSize: 1,
				color    : '#000',
				itemStyle: {
					normal: {
						areaStyle: {
							type : 'default',
							color: _color._lBlue
						},
						lineStyle:{
							color: _color._Blue,
							width: 2,
							type : 'solid'
						}
					}
				},
				data     : _getTestSeriesData()
			}

		]
	};
	return option;
}
//抖动
function getSingleLineDDOption(){

	var option = {
		dataZoom  : {
			show               : true,
			start              : 0,
			backgroundColor    : 'rgb(242,242,242)',
			dataBackgroundColor: 'rgb(207,207,207)',
			fillerColor        : 'rgba(0,183,17,0.3)'
		},
		color     : [_color._Green, _color._dGreen],
		grid      : {
			borderWidth: 0,
			x          : 55,
			y          : 50,
			x2         : 55,
			y2         : 70
		},
		title     : {
			show: false
		},
		tooltip   : {
			trigger        : 'axis',
			backgroundColor: '#ffffff',
			borderWidth    : '1',
			borderColor    : '#d9d9d9',
			axisPointer    : {
				lineStyle: {
					color: '#949494',
					width: 1,
					type : 'solid'
				}
			},
			textStyle      : {
				color   : '#666',
				fontSize: 12
			},
			formatter      : function(a){
				var _sn = a[0].seriesName;
				var _n = a[0].name;
				var _v = a[0].value;
				return _n+"<br>"+_sn +"：" +_v+"ms";
				/* if(_v<60){
				 return _sn+"<br>"+_n+" <span style='color:red'>" + _v + "%</span>";
				 }else{
				 return _sn+"<br>"+_n+" <span style='color:green'>" + _v + "%</span>";
				 }*/
				/*  if(_v<60){
				 return _sn+"<br>"+_n+" <span style='color:red'>" + _v + "%</span>";
				 }else{
				 return _sn+"<br>"+_n+" <span style='color:green'>" + _v + "%</span>";
				 }*/
			}
		},
		legend    : {
			show: true,
			x:'right',
			selectedMode:false,
			data: ['抖动']
		},
		toolbox   : {
			show: false
		},
		calculable: true,
		xAxis     : [
			{

				type       : 'category',
				boundaryGap: false,
				data       : _getTestXAxisData(),
				splitLine  : 0,
				axisLine   : {
					lineStyle: {
						color: '#f4f3f4',
						width: 1,
						type : 'solid'
					}
				},
				lineStyle  : {
					color: '#000'
				}
			}
		],
		yAxis     : [
			{
				type       : 'value',
				position   : 'right',
				max        : '100',
				min        : '0',
				splitNumber: '1',
				splitLine  : 0,
				axisLine   : {
					lineStyle: {
						color: '#f4f3f4',
						width: 1,
						type : 'solid'
					}
				},
				axisLabel : {
					formatter: '{value}ms'
				}
			}
		],
		series    : [
			{
				name     : '抖动',
				type     : 'line',
				smooth   : true,
				symbolSize: 1,
				color    : '#000',
				itemStyle: {
					normal: {
						areaStyle: {
							type : 'default',
							color: _color._lGreen
						},
						lineStyle:{
							color: _color._Green,
							width: 2,
							type : 'solid'
						}
					}
				},
				data     : _getTestSeriesData()
			}

		]
	};
	return option;
}

//切换展示类型
function toggleShowType(v){

	var $ec_line = $("#ec_line")[0];

	if(v == 0){

		ecObj.eLine = addCE($ec_line, getSingleLineSYOption());


	}else  if(v == 1){
		ecObj.eLine = addCE($ec_line, getSingleLineDBLOption());

	}else  if(v == 2){

		ecObj.eLine = addCE($ec_line, getSingleLineDDOption());
	}

}
//切换时间间隔
function zoomOut(v){

	var _start = 0;
	if(v==1){
		_start = 80;
	}
	else if(v==7){
		_start = 50;
	}
	else if(v==14){
		_start = 0;
	}
	ecObj.eLine.setOption({
		dataZoom: {
			show : true,
			start: _start,
			end  : 100
		}
	});

	var op = ecObj.eLine.getOption();
	ecObj.eLine.clear();
	ecObj.eLine.setOption(op);
}


//*********************  End line init Data  *********************