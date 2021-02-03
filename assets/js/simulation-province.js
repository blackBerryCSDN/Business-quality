

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

	ecObj.eProvinceMap = addCE($("#ec-score-china")[0],getEcProvinceOption());
	randomEcProvince(ecObj.eProvinceMap, '广东省厂家覆盖情况');

	ecObj.eNesBar = addCE($("#ec-nes-bar")[0],getECNesBarOption());

	randomEcNesBar(ecObj.eNesBar, '广东省各网元评分情况');


	ecObj.eLine = addCE($("#ec_line")[0],getSingleLineSYOption());


	ecObj.eProvinceMap.on("click", function(params){
		randomEcNesBar(ecObj.eNesBar, params.data.fName+'-网元评分情况');
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
function randomEcProvince(ecObj, title){

	//var cArr = ['重庆市','北京市','天津市','上海市','香港','澳门','巴音郭楞蒙古自治州','和田地区','哈密地区','阿克苏地区','阿勒泰地区','喀什地区','塔城地区','昌吉回族自治州','克孜勒苏柯尔克孜自治州','吐鲁番地区','伊犁哈萨克自治州','博尔塔拉蒙古自治州','乌鲁木齐市','克拉玛依市','阿拉尔市','图木舒克市','五家渠市','石河子市','那曲地区','阿里地区','日喀则地区','林芝地区','昌都地区','山南地区','拉萨市','呼伦贝尔市','阿拉善盟','锡林郭勒盟','鄂尔多斯市','赤峰市','巴彦淖尔市','通辽市','乌兰察布市','兴安盟','包头市','呼和浩特市','乌海市','海西蒙古族藏族自治州','玉树藏族自治州','果洛藏族自治州','海南藏族自治州','海北藏族自治州','黄南藏族自治州','海东地区','西宁市','甘孜藏族自治州','阿坝藏族羌族自治州','凉山彝族自治州','绵阳市','达州市','广元市','雅安市','宜宾市','乐山市','南充市','巴中市','泸州市','成都市','资阳市','攀枝花市','眉山市','广安市','德阳市','内江市','遂宁市','自贡市','黑河市','大兴安岭地区','哈尔滨市','齐齐哈尔市','牡丹江市','绥化市','伊春市','佳木斯市','鸡西市','双鸭山市','大庆市','鹤岗市','七台河市','酒泉市','张掖市','甘南藏族自治州','武威市','陇南市','庆阳市','白银市','定西市','天水市','兰州市','平凉市','临夏回族自治州','金昌市','嘉峪关市','普洱市','红河哈尼族彝族自治州','文山壮族苗族自治州','曲靖市','楚雄彝族自治州','大理白族自治州','临沧市','迪庆藏族自治州','昭通市','昆明市','丽江市','西双版纳傣族自治州','保山市','玉溪市','怒江傈僳族自治州','德宏傣族景颇族自治州','百色市','河池市','桂林市','南宁市','柳州市','崇左市','来宾市','玉林市','梧州市','贺州市','钦州市','贵港市','防城港市','北海市','怀化市','永州市','邵阳市','郴州市','常德市','湘西土家族苗族自治州','衡阳市','岳阳市','益阳市','长沙市','株洲市','张家界市','娄底市','湘潭市','榆林市','延安市','汉中市','安康市','商洛市','宝鸡市','渭南市','咸阳市','西安市','铜川市','清远市','韶关市','湛江市','梅州市','河源市','肇庆市','惠州市','茂名市','江门市','阳江市','云浮市','广州市','汕尾市','揭阳市','珠海市','佛山市','潮州市','汕头市','深圳市','东莞市','中山市','延边朝鲜族自治州','吉林市','白城市','松原市','长春市','白山市','通化市','四平市','辽源市','承德市','张家口市','保定市','唐山市','沧州市','石家庄市','邢台市','邯郸市','秦皇岛市','衡水市','廊坊市','恩施土家族苗族自治州','十堰市','宜昌市','襄樊市','黄冈市','荆州市','荆门市','咸宁市','随州市','孝感市','武汉市','黄石市','神农架林区','天门市','仙桃市','潜江市','鄂州市','遵义市','黔东南苗族侗族自治州','毕节地区','黔南布依族苗族自治州','铜仁地区','黔西南布依族苗族自治州','六盘水市','安顺市','贵阳市','烟台市','临沂市','潍坊市','青岛市','菏泽市','济宁市','德州市','滨州市','聊城市','东营市','济南市','泰安市','威海市','日照市','淄博市','枣庄市','莱芜市','赣州市','吉安市','上饶市','九江市','抚州市','宜春市','南昌市','景德镇市','萍乡市','鹰潭市','新余市','南阳市','信阳市','洛阳市','驻马店市','周口市','商丘市','三门峡市','新乡市','平顶山市','郑州市','安阳市','开封市','焦作市','许昌市','濮阳市','漯河市','鹤壁市','大连市','朝阳市','丹东市','铁岭市','沈阳市','抚顺市','葫芦岛市','阜新市','锦州市','鞍山市','本溪市','营口市','辽阳市','盘锦市','忻州市','吕梁市','临汾市','晋中市','运城市','大同市','长治市','朔州市','晋城市','太原市','阳泉市','六安市','安庆市','滁州市','宣城市','阜阳市','宿州市','黄山市','巢湖市','亳州市','池州市','合肥市','蚌埠市','芜湖市','淮北市','淮南市','马鞍山市','铜陵市','南平市','三明市','龙岩市','宁德市','福州市','漳州市','泉州市','莆田市','厦门市','丽水市','杭州市','温州市','宁波市','舟山市','台州市','金华市','衢州市','绍兴市','嘉兴市','湖州市','盐城市','徐州市','南通市','淮安市','苏州市','宿迁市','连云港市','扬州市','南京市','泰州市','无锡市','常州市','镇江市','吴忠市','中卫市','固原市','银川市','石嘴山市','儋州市','文昌市','乐东黎族自治县','三亚市','琼中黎族苗族自治县','东方市','海口市','万宁市','澄迈县','白沙黎族自治县','琼海市','昌江黎族自治县','临高县','陵水黎族自治县','屯昌县','定安县','保亭黎族苗族自治县','五指山市' ];
	var cArr = ['湛江市','梅州市','河源市','肇庆市','惠州市','茂名市','江门市','阳江市','云浮市','广州市','汕尾市','揭阳市','珠海市','佛山市','潮州市','汕头市','深圳市','东莞市','中山市','清远市','韶关市','汕头市'];

	var _newS =  [
		{
			name     : '厂家覆盖情况',
			type     : 'map',
			mapType  : '广东',
			roam     : false,
			itemStyle: {
				normal  : {label: {show: true}},
				emphasis: {label: {show: true}}
			},
			data     : (function(){
				var d = [];
				for(var i=0;i<cArr.length;i++){
					var _r = parseInt(4*Math.random())+1;
					var _num;
					var _fName="";
					if(_r ==1){
						_num =100;
						_fName = '华为';
					}else if(_r == 2){
						_num= 75;
						_fName = '中信';
					}else if(_r == 3){
						_num= 50;
						_fName = '爱立信';
					}else if(_r == 4){
						_num= 25;
						_fName = '诺西';
					}
					var _j = {
						name: cArr[i], value: _num, fName: _fName,tooltip: {
							trigger  : 'item',
							formatter: cArr[i] +
							"<br>" +  _fName
						}
					};
					d.push(_j);
				}

				return d;
			})()

		}
	];

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

function getEcProvinceOption(){
	var _option = {
		title : {
			text: '广东省厂家覆盖情况'
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
			x: 'right',
			y: 'bottom',
			splitNumber:4,
			color: ['#df8ba0','#afdece','#77abfd', '#00a073', '#8fc2ec'],
			formatter : function(v, v2){
				console.log(v2);
				if (v2 == 100) { return '华为'}      //value 100
				else if (v2 == 75) { return '中信'}      //value 100
				else if (v2 == 50) { return '爱立信'}      //value 100
				else if (v2 == 25) { return '诺西'}      //value 100
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

	var sArr =['GZMME1201BEr','GZSAEGW1201BEr','GZMME1301BEr','GZMME1304BEr','GZMME1306BEr','GZSAEGW1301BEr','GZMME1200BEr','GZMME1909BEr','GZMME098BEr','GZMME1100BEr'];

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

	//var sArr =['GZMME1201BEr','GZSAEGW1201BEr','GZMME1301BEr','GZMME1304BEr','GZMME1306BEr','GZSAEGW1301BEr','GZMME1200BEr','GZMME1909BEr','GZMME098BEr','GZMME1100BEr'];

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
		ecObj.setOption(
			{
				title: {
					text: title
				},
				yAxis: [{
					data: sArr
				}],
				series: _newS
			}
		);
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