
var ViewChange = {};

ViewChange.ecScoreChinaId = 'ec-score-china';
ViewChange.treeScoreChinaId = 'tree-score-china';
ViewChange.ecScoreProvinceId = 'ec-score-province';
ViewChange.treeScoreProvinceId = 'tree-score-province';


ViewChange.sortToggle = function(type) {

	var _this = this;

	var $ecChina = $("#"+_this.ecScoreChinaId);
	var $ecProvince = $("#"+_this.ecScoreProvinceId);
	var $treeChina = $("#"+_this.treeScoreChinaId);
	var $treeProvince = $("#"+_this.treeScoreProvinceId);
	//console.log($ecChina.is(":hidden"));
	//console.log($ecProvince.is(":hidden"));
	//console.log($treeChina.is(":hidden"));
	//console.log($treeProvince.is(":hidden"));
	if(type == 'ec' && $ecChina.is(":hidden")){
		$ecChina.show();
		$ecProvince.show();
		$treeChina.hide();
		$treeProvince.hide();
	}
	if(type == 'tree' && $treeChina.is(":hidden")){
		$ecChina.hide();
		$ecProvince.hide();
		$treeChina.show();
		$treeProvince.show();
	}
};


//产生业务随机数
function randomServiceData(){
	$(".list-category-vertical .badge").remove();

	var len = $(".scenario-title").length;
	for(var i=0; i<len ;i++){
		if((parseInt(5*Math.random())+1)== 3){
			var str = $(".scenario-title").eq(i).html();
			str += '<span class="badge badge-danger">'+ (parseInt(10*Math.random())+1) + '</span>';
			$(".scenario-title").eq(i).html(str);
		}
	}
};

//产生网络层随机数
function randomNetworkData(){

	//$(".list-level-network .level-alarm-num").remove();

	var len = $(".widget-level-item").length;
	for(var i=0; i<len ;i++){
		if((parseInt(2*Math.random())+1)== 1){
			$(".list-level-network .level-alarm-num").eq(i).attr("class",'level-alarm-num muted').html(0)
		}else{
			$(".list-level-network .level-alarm-num").eq(i).attr("class",'level-alarm-num text-danger').html((parseInt(20*Math.random())+1))
		}
	}
};

//产生随机地图数据-全国
function randomEcChina(ecObj){

	var pArr = ['北京', '天津', '上海', '重庆', '河北', '河南', '云南', '辽宁', '黑龙江', '湖南', '安徽', '山东', '新疆', '江苏', '浙江', '江西', '湖北', '广西', '甘肃', '山西', '内蒙古', '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏', '四川', '宁夏', '海南', '台湾', '香港', '澳门']


	var _newS =  [
		{
			name     : '各省业务测试质量评分',
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
							"<br>" + "质量综合评分："+ _num
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
		ecObj.setSeries(_newS);
	}, 500);


};

//产生随机地图数据-省份
function randomEcProvince(ecObj, provinceName){

	var cArr = ['重庆市','北京市','天津市','上海市','香港','澳门','巴音郭楞蒙古自治州','和田地区','哈密地区','阿克苏地区','阿勒泰地区','喀什地区','塔城地区','昌吉回族自治州','克孜勒苏柯尔克孜自治州','吐鲁番地区','伊犁哈萨克自治州','博尔塔拉蒙古自治州','乌鲁木齐市','克拉玛依市','阿拉尔市','图木舒克市','五家渠市','石河子市','那曲地区','阿里地区','日喀则地区','林芝地区','昌都地区','山南地区','拉萨市','呼伦贝尔市','阿拉善盟','锡林郭勒盟','鄂尔多斯市','赤峰市','巴彦淖尔市','通辽市','乌兰察布市','兴安盟','包头市','呼和浩特市','乌海市','海西蒙古族藏族自治州','玉树藏族自治州','果洛藏族自治州','海南藏族自治州','海北藏族自治州','黄南藏族自治州','海东地区','西宁市','甘孜藏族自治州','阿坝藏族羌族自治州','凉山彝族自治州','绵阳市','达州市','广元市','雅安市','宜宾市','乐山市','南充市','巴中市','泸州市','成都市','资阳市','攀枝花市','眉山市','广安市','德阳市','内江市','遂宁市','自贡市','黑河市','大兴安岭地区','哈尔滨市','齐齐哈尔市','牡丹江市','绥化市','伊春市','佳木斯市','鸡西市','双鸭山市','大庆市','鹤岗市','七台河市','酒泉市','张掖市','甘南藏族自治州','武威市','陇南市','庆阳市','白银市','定西市','天水市','兰州市','平凉市','临夏回族自治州','金昌市','嘉峪关市','普洱市','红河哈尼族彝族自治州','文山壮族苗族自治州','曲靖市','楚雄彝族自治州','大理白族自治州','临沧市','迪庆藏族自治州','昭通市','昆明市','丽江市','西双版纳傣族自治州','保山市','玉溪市','怒江傈僳族自治州','德宏傣族景颇族自治州','百色市','河池市','桂林市','南宁市','柳州市','崇左市','来宾市','玉林市','梧州市','贺州市','钦州市','贵港市','防城港市','北海市','怀化市','永州市','邵阳市','郴州市','常德市','湘西土家族苗族自治州','衡阳市','岳阳市','益阳市','长沙市','株洲市','张家界市','娄底市','湘潭市','榆林市','延安市','汉中市','安康市','商洛市','宝鸡市','渭南市','咸阳市','西安市','铜川市','清远市','韶关市','湛江市','梅州市','河源市','肇庆市','惠州市','茂名市','江门市','阳江市','云浮市','广州市','汕尾市','揭阳市','珠海市','佛山市','潮州市','汕头市','深圳市','东莞市','中山市','延边朝鲜族自治州','吉林市','白城市','松原市','长春市','白山市','通化市','四平市','辽源市','承德市','张家口市','保定市','唐山市','沧州市','石家庄市','邢台市','邯郸市','秦皇岛市','衡水市','廊坊市','恩施土家族苗族自治州','十堰市','宜昌市','襄樊市','黄冈市','荆州市','荆门市','咸宁市','随州市','孝感市','武汉市','黄石市','神农架林区','天门市','仙桃市','潜江市','鄂州市','遵义市','黔东南苗族侗族自治州','毕节地区','黔南布依族苗族自治州','铜仁地区','黔西南布依族苗族自治州','六盘水市','安顺市','贵阳市','烟台市','临沂市','潍坊市','青岛市','菏泽市','济宁市','德州市','滨州市','聊城市','东营市','济南市','泰安市','威海市','日照市','淄博市','枣庄市','莱芜市','赣州市','吉安市','上饶市','九江市','抚州市','宜春市','南昌市','景德镇市','萍乡市','鹰潭市','新余市','南阳市','信阳市','洛阳市','驻马店市','周口市','商丘市','三门峡市','新乡市','平顶山市','郑州市','安阳市','开封市','焦作市','许昌市','濮阳市','漯河市','鹤壁市','大连市','朝阳市','丹东市','铁岭市','沈阳市','抚顺市','葫芦岛市','阜新市','锦州市','鞍山市','本溪市','营口市','辽阳市','盘锦市','忻州市','吕梁市','临汾市','晋中市','运城市','大同市','长治市','朔州市','晋城市','太原市','阳泉市','六安市','安庆市','滁州市','宣城市','阜阳市','宿州市','黄山市','巢湖市','亳州市','池州市','合肥市','蚌埠市','芜湖市','淮北市','淮南市','马鞍山市','铜陵市','南平市','三明市','龙岩市','宁德市','福州市','漳州市','泉州市','莆田市','厦门市','丽水市','杭州市','温州市','宁波市','舟山市','台州市','金华市','衢州市','绍兴市','嘉兴市','湖州市','盐城市','徐州市','南通市','淮安市','苏州市','宿迁市','连云港市','扬州市','南京市','泰州市','无锡市','常州市','镇江市','吴忠市','中卫市','固原市','银川市','石嘴山市','儋州市','文昌市','乐东黎族自治县','三亚市','琼中黎族苗族自治县','东方市','海口市','万宁市','澄迈县','白沙黎族自治县','琼海市','昌江黎族自治县','临高县','陵水黎族自治县','屯昌县','定安县','保亭黎族苗族自治县','五指山市' ];


	var _newS =  [
		{
			name: '质量综合评分',
			type: 'map',
			mapType: provinceName,
			itemStyle:{
				normal:{label:{show:true}},
				emphasis:{label:{show:true},color:'rgba(255,255,255,0.3)'}
			},
			data:(function(){

				var d= [];
				for(var i=0;i<cArr.length; i++){

					var _num =  Math.round(Math.random() * 100);
					var _j = {
						byP : provinceName,
						name: cArr[i],value: _num,tooltip:{
						trigger:'item',
						formatter:cArr[i]+
						"<br>" + "质量综合评分："+_num
					}}
					d.push(_j);
				}
				return d;
			})()


				/*[
				{name: '南平市',value: 100,tooltip:{
					trigger:'item',
					formatter:"南平市"+
					"<br>"+"综合得分：95.00"+
					"<br>"+"2G/3G/4G：优"+
					"<br>"+"家客：优"+
					"<br>"+"集客：优"+
					"<br>"+"WLAN：优"
				}}

			]*/
		}
	];

	ecObj.showLoading({
		text: '加载中...'    //loading话术
	});
	setTimeout(function() {
		ecObj.hideLoading();
		ecObj.setSeries(_newS);
	}, 500);


};

//切换城市
function toggleAreaChoose(){

	var _len = arguments.length;
	if(_len ==1 ){
		$("#chooseAreText").html(arguments[0]);
	}else if(_len ==2 ){
		$("#chooseAreText").html(arguments[0]+" - "+arguments[1]);
	}

}

var ecChina = undefined;
var ecProvince = undefined;




$(function(){

	initSortTree();
	randomServiceData();
	randomNetworkData();

	ecChina = addCE($("#ec-score-china")[0],getEcChinaOption());
	randomEcChina(ecChina);
	ecChina.on(echarts.config.EVENT.CLICK, function(param) {
		var _name = param.name;
		randomEcProvince(ecProvince, _name);
		randomServiceData();
		randomNetworkData();
		toggleAreaChoose(_name)
	});

	ecProvince = addCE($("#ec-score-province")[0],getEcProvinceOption());
	randomEcProvince(ecProvince, '浙江');
	ecProvince.on(echarts.config.EVENT.CLICK, function(param) {
		randomServiceData();
		randomNetworkData();
		toggleAreaChoose(param.data.byP, param.data.name)
	});


	$(".sort-tree .box").on("click", function(){
		randomServiceData();
		randomNetworkData();
	});



	$(".list-category-vertical .scenario-title").on("click", function(){
		if($(this).hasClass("active")) { return;}

		$(".list-category-vertical .scenario-title").removeClass("active");
		$(this).addClass("active");
		randomNetworkData();
		randomEcChina(ecChina);
		randomEcProvince(ecProvince, '浙江');
	});


	$(".list-level-network .widget-level-item").on("click", function(){
		if($(this).hasClass("active")) { return;}

		$(".list-level-network .widget-level-item").removeClass("active");
		$(this).addClass("active");
		randomServiceData();
		randomEcChina(ecChina);
		randomEcProvince(ecProvince, '浙江');
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


function getEcChinaOption(){
	var _option = {
		title : {
			text: '全国概况',
			subtext: '各省业务测试质量评分'
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

function getEcProvinceOption(){
	var pArr = ['重庆市','北京市','天津市','上海市','香港','澳门','巴音郭楞蒙古自治州','和田地区','哈密地区','阿克苏地区','阿勒泰地区','喀什地区','塔城地区','昌吉回族自治州','克孜勒苏柯尔克孜自治州','吐鲁番地区','伊犁哈萨克自治州','博尔塔拉蒙古自治州','乌鲁木齐市','克拉玛依市','阿拉尔市','图木舒克市','五家渠市','石河子市','那曲地区','阿里地区','日喀则地区','林芝地区','昌都地区','山南地区','拉萨市','呼伦贝尔市','阿拉善盟','锡林郭勒盟','鄂尔多斯市','赤峰市','巴彦淖尔市','通辽市','乌兰察布市','兴安盟','包头市','呼和浩特市','乌海市','海西蒙古族藏族自治州','玉树藏族自治州','果洛藏族自治州','海南藏族自治州','海北藏族自治州','黄南藏族自治州','海东地区','西宁市','甘孜藏族自治州','阿坝藏族羌族自治州','凉山彝族自治州','绵阳市','达州市','广元市','雅安市','宜宾市','乐山市','南充市','巴中市','泸州市','成都市','资阳市','攀枝花市','眉山市','广安市','德阳市','内江市','遂宁市','自贡市','黑河市','大兴安岭地区','哈尔滨市','齐齐哈尔市','牡丹江市','绥化市','伊春市','佳木斯市','鸡西市','双鸭山市','大庆市','鹤岗市','七台河市','酒泉市','张掖市','甘南藏族自治州','武威市','陇南市','庆阳市','白银市','定西市','天水市','兰州市','平凉市','临夏回族自治州','金昌市','嘉峪关市','普洱市','红河哈尼族彝族自治州','文山壮族苗族自治州','曲靖市','楚雄彝族自治州','大理白族自治州','临沧市','迪庆藏族自治州','昭通市','昆明市','丽江市','西双版纳傣族自治州','保山市','玉溪市','怒江傈僳族自治州','德宏傣族景颇族自治州','百色市','河池市','桂林市','南宁市','柳州市','崇左市','来宾市','玉林市','梧州市','贺州市','钦州市','贵港市','防城港市','北海市','怀化市','永州市','邵阳市','郴州市','常德市','湘西土家族苗族自治州','衡阳市','岳阳市','益阳市','长沙市','株洲市','张家界市','娄底市','湘潭市','榆林市','延安市','汉中市','安康市','商洛市','宝鸡市','渭南市','咸阳市','西安市','铜川市','清远市','韶关市','湛江市','梅州市','河源市','肇庆市','惠州市','茂名市','江门市','阳江市','云浮市','广州市','汕尾市','揭阳市','珠海市','佛山市','潮州市','汕头市','深圳市','东莞市','中山市','延边朝鲜族自治州','吉林市','白城市','松原市','长春市','白山市','通化市','四平市','辽源市','承德市','张家口市','保定市','唐山市','沧州市','石家庄市','邢台市','邯郸市','秦皇岛市','衡水市','廊坊市','恩施土家族苗族自治州','十堰市','宜昌市','襄樊市','黄冈市','荆州市','荆门市','咸宁市','随州市','孝感市','武汉市','黄石市','神农架林区','天门市','仙桃市','潜江市','鄂州市','遵义市','黔东南苗族侗族自治州','毕节地区','黔南布依族苗族自治州','铜仁地区','黔西南布依族苗族自治州','六盘水市','安顺市','贵阳市','烟台市','临沂市','潍坊市','青岛市','菏泽市','济宁市','德州市','滨州市','聊城市','东营市','济南市','泰安市','威海市','日照市','淄博市','枣庄市','莱芜市','赣州市','吉安市','上饶市','九江市','抚州市','宜春市','南昌市','景德镇市','萍乡市','鹰潭市','新余市','南阳市','信阳市','洛阳市','驻马店市','周口市','商丘市','三门峡市','新乡市','平顶山市','郑州市','安阳市','开封市','焦作市','许昌市','濮阳市','漯河市','鹤壁市','大连市','朝阳市','丹东市','铁岭市','沈阳市','抚顺市','葫芦岛市','阜新市','锦州市','鞍山市','本溪市','营口市','辽阳市','盘锦市','忻州市','吕梁市','临汾市','晋中市','运城市','大同市','长治市','朔州市','晋城市','太原市','阳泉市','六安市','安庆市','滁州市','宣城市','阜阳市','宿州市','黄山市','巢湖市','亳州市','池州市','合肥市','蚌埠市','芜湖市','淮北市','淮南市','马鞍山市','铜陵市','南平市','三明市','龙岩市','宁德市','福州市','漳州市','泉州市','莆田市','厦门市','丽水市','杭州市','温州市','宁波市','舟山市','台州市','金华市','衢州市','绍兴市','嘉兴市','湖州市','盐城市','徐州市','南通市','淮安市','苏州市','宿迁市','连云港市','扬州市','南京市','泰州市','无锡市','常州市','镇江市','吴忠市','中卫市','固原市','银川市','石嘴山市','儋州市','文昌市','乐东黎族自治县','三亚市','琼中黎族苗族自治县','东方市','海口市','万宁市','澄迈县','白沙黎族自治县','琼海市','昌江黎族自治县','临高县','陵水黎族自治县','屯昌县','定安县','保亭黎族苗族自治县','五指山市' ];

	var _option = {
		title: {
			text: '全省概况',
			subtext: '各地市业务测试质量评分'
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

		]
	};
	return _option;
}

/**
 * 初始化分数tree
 */
function initSortTree(){
	var pArr = ['北京', '天津', '上海', '重庆', '河北', '河南', '云南', '辽宁', '黑龙江', '湖南', '安徽', '山东', '新疆', '江苏', '浙江', '江西', '湖北', '广西', '甘肃', '山西', '内蒙古', '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏', '四川', '宁夏', '海南', '台湾', '香港', '澳门']
	var str = "";
	var count = 100;
	for(var i=0; i<pArr.length ;i++){
		str +='<li>';
		str +='<div class="box">';
		str +='<div class="ground" style="width: '+ count +'%"></div>';
		str +='<span class="left">【'+(i+1)+'】'+pArr[i]+'</span><span class="right">'+ count +'</span></div>';
		str +='</li>';
		count = count-2;
	}
	$("#sort-tree-china").html(str);

	var cArr = ['杭州市','温州市','宁波市','舟山市','台州市','金华市','衢州市','绍兴市','嘉兴市','湖州市'];
	var str = "";
	var count = 100;
	for(var i=0; i<cArr.length ;i++){
		str +='<li>';
		str +='<div class="box">';
		str +='<div class="ground" style="width: '+ count +'%"></div>';
		str +='<span class="left">【'+(i+1)+'】'+cArr[i]+'</span><span class="right">'+ count +'</span></div>';
		str +='</li>';
		count = count-4;
	}
	$("#sort-tree-province").html(str);
}