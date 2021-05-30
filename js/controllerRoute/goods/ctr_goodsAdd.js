tempApp.controller('ctr_goodsAdd', function($scope, http, messageFactory, $state, $stateParams, EzConfirm) {
  $scope.pager = { page: 1, rows: "10", sort: "pm_id", order: "desc", pageList: ["10", "20", "30"] };
  $scope.priceList = [{ psp_gradeid_nameref: "金牌", psp_grade_discount: 0.8 ,psp_is_buy:"Y"}, { psp_gradeid_nameref: "钻石用户", psp_grade_discount: 0.9 ,psp_is_buy:"Y"}, { psp_gradeid_nameref: "铜牌用户", psp_grade_discount: 0.95 ,psp_is_buy:"Y"}, { psp_gradeid_nameref: "普通用户", psp_grade_discount: 1 ,psp_is_buy:"Y"}];
  $scope.brandList = [{ggg_id:"100001180117142142293479651",ggg_title:"完达山"}];
  $scope.unitList = [{bu_id:"10000000001",bu_name:"盒"},{bu_id:"10000000002",bu_name:"箱"},{bu_id:"10000000003",bu_name:"瓶"}];
  $scope.unitVO = {};
  $scope.skuList = [{}];
  var zNodes = [{"bca_name":"湖北","click":false,"id":"100000171129170644062853742","name":"湖北","open":false,"pId":"0"},{"bca_name":"武汉","click":false,"id":"100000171129170657953838626","name":"武汉","open":false,"pId":"100000171129170644062853742"},{"bca_name":"河北","click":false,"id":"100000171129185316423771509","name":"河北","open":false,"pId":"0"},{"bca_name":"邢台","click":false,"id":"100000171129185325480218661","name":"邢台","open":false,"pId":"100000171129185316423771509"},{"bca_name":"廊坊","click":false,"id":"100000171129185357344435693","name":"廊坊","open":false,"pId":"100000171129185316423771509"},{"bca_name":"燕郊","click":false,"id":"100000171129185423135480292","name":"燕郊","open":false,"pId":"100000171129185316423771509"},{"bca_name":"北京","click":false,"id":"100000171129185429434829685","name":"北京","open":false,"pId":"0"},{"bca_name":"大兴","click":false,"id":"100000171129185437299534955","name":"大兴","open":false,"pId":"100000171129185429434829685"},{"bca_name":"严加","click":false,"id":"100000171211161810428315482","name":"严加","open":false,"pId":"100000171129185423135480292"}];
  $scope.vo = {pm_market_price:0,pm_price:0};
  var zTreeObj = null;
  var setting = {
      data: { 
        key: { 
          title: "t"
        }, 
        simpleData: { 
          enable: true
        }
      },
      callback: { 
          onClick: function(event, treeId, treeNode){
            $scope.$apply(function(){
            	if(treeNode.check_Child_State>=0){
            		messageFactory.showMessage("error","只能选择子节点");
            		return;
            	}
            	$scope.vo.pm_categoryid = treeNode.id;
            	$scope.vo.pm_categoryid_nameref =treeNode.bca_name;
            	$scope.showCategory = false;
            })
          }
        }
    };
  zTreeObj = $.fn.zTree.init($("#categrayList"), setting, zNodes);
  $scope.goBack = function() {
    window.history.back();
  };
	var isImgEventExist = false;
  /**
   * 显示图片上传
   */
  $scope.upImage = function($event, x) {
    setX(x);
    if (!isImgEventExist) {
      isImgEventExist = true;
      $scope.ue_myeditor.addListener("beforeInsertImage", function(t, arg) {
        var x = getX();
        var imgs = "";

        if (arg.length > 0) {
          imgs = arg[0].src;
        }
        var imgsArr = imgs.split(",");
        if (x == 1) {
          $scope.vo.pm_picture_show = imgsArr[0].split("|")[0];
          $scope.vo.pm_picture = imgsArr[0]
            .split("|")[0]
            .split("static/upload/image")[1];
        }
        if (x == 2) {
          $scope.vo.pm_picture_show2 = imgsArr[0].split("|")[0];
          $scope.vo.pm_picture2 = imgsArr[0]
            .split("|")[0]
            .split("static/upload/image")[1];
        }
      });
    }
    var myImage = $scope.ue_myeditor.getDialog("insertimage");
    myImage.open();
  };
  var tempX;
  function setX(x) {
    tempX = x;
  }
  function getX() {
    return tempX;
  }
  
  /**
   * 选择品牌
   */
  $scope.selectBrandFun = function(obj){
	  $scope.vo.pm_brandid = obj.ggg_id;
	  $scope.vo.pm_brandid_nameref = obj.ggg_title;
  }
  
  /**
   * 选择品牌
   */
  $scope.selectUnitFun = function(obj){
	  $scope.unitVO.pur_unitid_min = obj.bu_id;
	  $scope.unitVO.pur_unitid_min_nameref = obj.bu_name;
  }
  
  /**
   * 添加商品
   */
  $scope.addProduct = function(){
	  var success = function(result){
		  messageFactory.showMessage("success",result.desc);
	  }
	  var error = function(result){
		  messageFactory.showMessage("error",result.desc);
	  }
	  var url = "/admin/product/productMainControl/addProduct.action";
	  var data = $.extend({},$scope.vo,{priceListStr:JSON.stringify($scope.priceList)},{skuListStr:JSON.stringify($scope.skuList)});
	  http.post(url,data,success,error);
  }
  
  /**
   * 
   */
  $scope.calPriceFun = function(){
	  for(x in $scope.priceList){
		  $scope.priceList[x].psp_price = $scope.vo.pm_market_price*$scope.priceList[x].psp_grade_discount;
	  }
  }
  
  $scope.checkFun = function(obj){
	  if(obj.psp_is_buy=='Y'){
		  obj.psp_is_buy = 'N';
	  }else{
		  obj.psp_is_buy = 'Y';
	  }
  }
  
})