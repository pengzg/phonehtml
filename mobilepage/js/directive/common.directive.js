tempApp.directive('repeatFinish', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    //scope.$emit('ngRepeatFinished');
                    scope.$eval(attr.repeatFinish);
                });
            }
        }
    };
}).directive("tmPagination",function(){
    return {
        restrict: 'EA',
        template: function(tElement,tAttrs){
            var id = tAttrs.id;
            if(id==undefined||id==''){
                id = 'inputPage';
            }
            var html = '<div style="background: #eeeeee;width: 100%;border-radius: 4px;height: 46px;"><ul class="pagination pagination-lg floatRight">'+
            '<span class="floatLeft m20right f14"> 第 {{jumpPageNum}}页/共{{conf.pageTotal}}页  共 {{conf.total}} 条记录</span>'+
            '<li><a class="hover_a" ng-click="prevPage();" style="color: #fff;background-color: #7b8aa1;">«</a></li>'+
            '<li><a class="hover_a" ng-show="jumpPageNum>1" ng-click="prevPage();" style="color: #fff;background-color: #7b8aa1;">{{jumpPageNum-1}}</a></li>'+
            '<li><a class="active_pagination" style="color: #fff;background-color: #7b8aa1;">{{jumpPageNum}}</a></li>'+
            '<li><a class="hover_a" ng-show="jumpPageNum<conf.pageTotal" ng-click="nextPage();" style="color: #fff;background-color: #7b8aa1;">{{jumpPageNum+1}}</a></li>'+
            '<li><a class="hover_a" ng-click="nextPage();" style="color: #fff;background-color: #7b8aa1;">»</a></li>'+
            '<span class="inputSpan m20left hover_a" style="width: 85px; background-color: #7b8aa1; border: none; height: 36px; overflow: visible;">'+
            '<input style="background-color:#7b8aa1 !important;color:#fff;width:66px;padding: 3px 3px 3px 11px;" class="inputTxt3 dropdown hover_input" data-toggle="dropdown" type="text" value="{{itemsPerPage}}条/页" autocomplete="off" readonly="readonly">'+
            '<i class="inputCiycle3 dropdown" data-toggle="dropdown"></i>'+
            '<div class="zk_selectDiv3" style="width:80px;">'+
            '<span class="stOption hover_a" ng-repeat="x in conf.pageList" ng-click="changeSelectPage(x);">{{x}}条/页</span>'+
            '</div></span>'+
            '<span class="m20left f14 m20right">跳至<input class="x-inputPage hover_a" id="'+id+'" ng-model="jumpPageNum1" ng-change="changePage();" ng-keyup="keyUpPage($event);" type="text" style=" border:0; height: 24px; line-height: 24px; color: #fff; width: 40px; background-color: #7b8aa1; text-align: center;margin-left:13px;">页</span>'+
            '</ul></div>';
            return html;
        },
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs){
            var  ipageName = attrs.conf;
            var id = attrs.id;
            if(id==undefined||id==''){
                id = 'inputPage';
            }
            scope.jumpPageNum = scope.conf.page;
            scope.jumpPageNum1 = scope.conf.page;
            scope.itemsPerPage = scope.conf.rows;
            scope.keyUpPage = function(e){
                var keycode = window.event?e.keyCode:e.which;
                if(keycode==13){
                    var page = angular.element("#"+id).val();
                    scope.conf.page = parseInt(page);
                }
            };
            
            scope.changeSelectPage = function(x){
                scope.itemsPerPage = x;
                scope.conf.rows = x;
                scope.conf.page = 1;
                scope.jumpPageNum1 = 1;
            }
            
            scope.changePage = function(){
                var page = scope.jumpPageNum1+'';
                scope.jumpPageNum1 = parseInt(page.replace(/[^0-9]/g,''));
                if(scope.jumpPageNum1 <=0){
                    scope.jumpPageNum1 = 1;
                }
                if(scope.jumpPageNum1 > scope.conf.pageTotal){
                    scope.jumpPageNum1 = scope.conf.pageTotal;
                }
            }
            // pageList数组
            function getPagination(){
                //scope.$parent[ipageName] = scope.conf;
                scope.jumpPageNum = scope.conf.page;
            }

            // prevPage
            scope.prevPage = function(){
                if(scope.conf.page > 1){
                    scope.conf.page -= 1;
                }
                scope.jumpPageNum = scope.conf.page;
                scope.jumpPageNum1 = scope.conf.page;
            };
            
            // nextPage
            scope.nextPage = function(){
                if(scope.conf.page < scope.conf.pageTotal){
                    scope.conf.page += 1;
                    scope.jumpPageNum = scope.conf.page;
                    scope.jumpPageNum1 = scope.conf.page;
                }
            };

            scope.$watch(function(){
                var newValue = scope.conf.page+' '+scope.conf.rows+' '+scope.conf.sort+' '+scope.conf.order+' ';
                return newValue;
            }, getPagination);

        }
    };
}).directive("tmSelect",function($compile, http){
    return {
        restrict: 'EA',
        require: '?ngModel',
        template: function(tElement,tAttrs){
        	var option = JSON.parse(tAttrs.options);
        	var valueField = option.valueField;
			var textField = option.textField;
        	if(tAttrs.width==undefined||tAttrs.width==''){
        		tAttrs.width = '110';
        	}
        	var html = '<span class="inputSpan" style="width: '+parseInt(tAttrs.width)+'px; height: 32px; overflow: visible;">' +
        	'<input style="width:'+(parseInt(tAttrs.width)-40)+'px; height: 18px; border: none !important;" ng-model="chooseItemName" class="inputTxt dropdown" data-toggle="dropdown" type="text" value autocomplete="off" readonly="readonly">'+
            '<i class="inputCiycle dropdown" data-toggle="dropdown"></i>' +
            '<div class="zk_selectDiv" style="width:'+(parseInt(tAttrs.width)+2)+'px;">'+
            '<span ng-repeat="x in selectItems" ng-click="chooseFun(x);" class="stOption dropdown" data-toggle="dropdown">{{x.'+textField+'}}</span>'+
            '</div></span>';
        	return html;
        },
        replace: true,
        scope: {
        	ngModel:'='
        },
        link: function(scope, element, attrs,ngModel){
        	var option = JSON.parse(attrs.options);
        	var valueField = option.valueField;
			var textField = option.textField;
			var defSelect = option.defSelect;
			var url = option.url;
			http.post(url,{},function(result){
				scope.selectItems = result.data;
				if(scope.ngModel!=undefined&&scope.ngModel!=''){
					for(x in scope.selectItems){
						if(scope.selectItems[x][valueField]==scope.ngModel){
							scope.chooseItemName = scope.selectItems[x][textField];
							scope.chooseItemCode = scope.selectItems[x][valueField];
						}
					}
				}else if(defSelect){
					scope.chooseItemName = scope.selectItems[0][textField];
					scope.chooseItemCode = scope.selectItems[0][valueField];
					ngModel.$setViewValue(scope.chooseItemCode);
				}
			},function(result){
				
			})
			scope.chooseFun = function(item){
				scope.chooseItemName = item[textField];
				scope.chooseItemCode = item[valueField];
				ngModel.$setViewValue(scope.chooseItemCode);
			}
        }
    };
}).directive("tmSelectSearch",function($compile, http){
    return {
        restrict: 'EA',
        require: '?ngModel',
        template: function(tElement,tAttrs){
        	var option = JSON.parse(tAttrs.options);
        	var valueField = option.valueField;
			var textField = option.textField;
        	if(tAttrs.width==undefined||tAttrs.width==''){
        		tAttrs.width = '208';
        	}
        	var html ='<span class="inputSpanStyle" style="width: '+parseInt(tAttrs.width)+'px; height: 36px; overflow: visible;">'+
        	'<input style="width:'+(parseInt(tAttrs.width)-36)+'px; padding:2px 10px; border: none !important;" ng-model="chooseItemName" class="inputTxt dropdown" data-toggle="dropdown" type="text" value autocomplete="off" readonly="readonly">'+
        	'<i class="inputCiycle dropdown" data-toggle="dropdown"></i>'+
        	'<div class="zk_selectDiv2" style="width:'+(parseInt(tAttrs.width)+2)+'px;">'+
        	'<span ng-repeat="x in selectItems" ng-click="chooseFun(x);" class="stOption">{{x.'+textField+'}}</span>'+
        	'</div></span>';
        	return html;
        },
        replace: true,
        scope: {
        	ngModel:'='
        },
        link: function(scope, element, attrs,ngModel){
        	var option = JSON.parse(attrs.options);
        	var valueField = option.valueField;
			var textField = option.textField;
			var defSelect = option.defSelect;
			var url = option.url;
			http.post(url,{},function(result){
				scope.selectItems = result.data;
				var searchL = {};
				searchL[textField] = '全部';
				searchL[valueField] = '';
				scope.selectItems.splice(0,0,searchL);
				if(scope.ngModel!=undefined&&scope.ngModel!=''){
					for(x in scope.selectItems){
						if(scope.selectItems[x][valueField]==scope.ngModel){
							scope.chooseItemName = scope.selectItems[x][textField];
							scope.chooseItemCode = scope.selectItems[x][valueField];
						}
					}
				}else if(defSelect){
					scope.chooseItemName = scope.selectItems[0][textField];
					scope.chooseItemCode = scope.selectItems[0][valueField];
					ngModel.$setViewValue(scope.chooseItemCode);
				}
			},function(result){
				
			})
			scope.chooseFun = function(item){
				scope.chooseItemName = item[textField];
				scope.chooseItemCode = item[valueField];
				ngModel.$setViewValue(scope.chooseItemCode);
			}
        }
    };
}).directive("zkControlGroup",function($compile, http){
    return {
        restrict: 'EA',
        require: '?ngModel',
        template: function(tElement,tAttrs){
        	var option = JSON.parse(tAttrs.option);
        	var htmlId = tAttrs.htmlid;
        	if (htmlId == undefined || htmlId == "") {
        		htmlId = "ios-checkbox";
        	}
        	
        	var obj1 = option[0];
        	var obj2 = option[1];
        	var key = '';
        	var value = '';
        	for(item in obj1){
        		key = item;
        		value= obj1[item];
        	}
        	var key1 = '';
        	var value1 = '';
        	for(item in obj2){
        		key1 = item;
        		value1 = obj2[item];
        	}
        	var html = '<div class="zk_controlGroup"><div class="zk_controlInput">' +
        	'<span class="f12 ray5 m40left m10right">'+value+'</span><div class="ios-checkbox">'+
        	'<input type="checkbox" ng-click="checkFun();" ng-checked="ngModel=='+key1+'" id="'+htmlId+'" name="emulate-ios-button" class="raw-checkbox">'+
        	'<label for="'+htmlId+'" class="emulate-ios-button"></label>'+
        	'</div>'+
        	'<span class="f12 ray5 m10left">'+value1+'</span></div></div>';
        	return html;
        },
        scope: {
        	ngModel:'='
        },
        replace: true,
        link: function(scope, element, attrs,ngModel){
        	var option = JSON.parse(attrs.option);
        	var obj1 = option[0];
        	var obj2 = option[1];
        	var key = '';
        	var value = '';
        	for(item in obj1){
        		key = item;
        		value= obj1[item];
        	}
        	var key1 = '';
        	var value1 = '';
        	for(item in obj2){
        		key1 = item;
        		value1 = obj2[item];
        	}
        	scope.checkFun = function(){
        		if(scope.ngModel==key){
        			scope.ngModel = key1;
        		}else
        		if(scope.ngModel==key1){
        			scope.ngModel = key;
        		}
        		ngModel.$setViewValue(scope.ngModel); 
        	}
        }
    };
}).directive('tree', function (http) { 
  return { 
        require: '?ngModel', 
        restrict: 'A', 
        link: function (scope, element, attrs, ngModel) { 
          //var opts = angular.extend({}, scope.$eval(attrs.nlUploadify));
        var option = JSON.parse(attrs.options);
        var url = option.url;
        var treeObj;
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
              onClick: function (event, treeId, treeNode, clickFlag) { 
                scope.$apply(function () { 
                  if(clickFlag){
                      ngModel.$setViewValue(treeNode); 
                  }else{
                      ngModel.$setViewValue({id:''}); 
                  }
                  scope.$eval(attrs.treeClick);
                }); 
                if(attrs.hideId){
                    $('#'+attrs.hideId).hide();
                }
              } 
            },
            edit:{
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false,
                drag: {
                    isCopy: false,
                    isMove: false
                }
            }
          }; 
          if(attrs.needUpDown){
            setting.view = {
                addHoverDom: addHoverDom,
                removeHoverDom: removeHoverDom
            }
          }
         function addHoverDom(treeId, treeNode) {
            var aObj = $("#" + treeNode.tId + "_a");
            if ($("#up_"+treeNode.id).length>0) return;
            if ($("#down_"+treeNode.id).length>0) return;
            var editStr = "<i id='up_" +treeNode.id+ "' onfocus='this.blur();' class='zTreeUp' title='上移'></i>"
                          +"<i id='down_" +treeNode.id+ "' onfocus='this.blur();' class='zTreeDown' title='下移'></i>";
            aObj.append(editStr);
            var up = $("#up_"+treeNode.id);
            var down = $("#down_"+treeNode.id);
            if (up){
               up.bind("click", function(){
                    event.stopPropagation(); 
                    scope.$apply(function(){
                        scope.upNode(treeNode.id);
                        if(treeNode.getPreNode()){
                            treeObj.moveNode(treeNode.getPreNode(),treeNode, "prev");
                        }
                    })
                }); 
            } 
            if (down){
               down.bind("click", function(){
                     event.stopPropagation(); 
                     scope.$apply(function(){
                        scope.downNode(treeNode.id);
                        if(treeNode.getNextNode()){
                            treeObj.moveNode(treeNode.getNextNode(), treeNode, "next");
                        }
                 })
               }); 
            } 
        };

        function removeHoverDom(treeId, treeNode) {
            $("#up_"+treeNode.id).unbind().remove();
            $("#down_" +treeNode.id).unbind().remove();
        };

          http.post(url,{},function(result){
              var zNodes = result.data;
              var maxLength = attrs.maxLength;
              for(x in zNodes){
                  if(zNodes[x].pId == "null"||zNodes[x].pId==0){
                      zNodes[x].open=true;
                  }
                  var nameTemp = zNodes[x].name;
                  zNodes[x].t =  nameTemp;
                  if(maxLength&&(nameTemp.length>maxLength)){
                      zNodes[x].name = nameTemp.substring(0,maxLength)+'...';
                  }
              }
              $.fn.zTree.init(element, setting, zNodes); 
              treeObj = $.fn.zTree.getZTreeObj("tree");
            },function(result){
                
            })
          /*var zNodes = [ 
            { id: 1, pId: 0, name: "普通的父节点",  open: true }, 
            { id: 11, pId: 1, name: "叶子节点 - 1"}, 
            { id: 12, pId: 1, name: "叶子节点 - 2"}, 
            { id: 13, pId: 1, name: "叶子节点 - 3"}, 
            { id: 2, pId: 0, name: "NB的父节点", open: true }, 
            { id: 21, pId: 2, name: "叶子节点2 - 1", t: "你哪个单位的？敢随便点我？小心点儿..", click: false }, 
            { id: 22, pId: 2, name: "叶子节点2 - 2", t: "我有老爸罩着呢，点击我的小心点儿..", click: false }, 
            { id: 23, pId: 2, name: "叶子节点2 - 3", t: "好歹我也是个领导，别普通群众就来点击我..", click: false }, 
            { id: 3, pId: 0, name: "郁闷的父节点", t: "别点我，我好害怕...我的子节点随便点吧...", open: true, click: false }, 
            { id: 31, pId: 3, name: "叶子节点3 - 1", t: "唉，随便点我吧" }, 
            { id: 32, pId: 3, name: "叶子节点3 - 2", t: "唉，随便点我吧" }, 
            { id: 33, pId: 3, name: "叶子节点3 - 3", t: "唉，随便点我吧" },
            { id: 34, pId: 33, name: "叶子节点3 - 3", t: "唉，随便点我吧" } 
          ];*/ 
          
        } 
      }; 
}).directive('settingPop',function($rootScope){
    return {
        restrict: 'E',
        templateUrl: "views/setting/settingPop.html"
    }
}).directive('compop',function(){
    return {
        restrict: 'E',
        templateUrl: "views/publicHtml/compop.html"
    }
}).directive('compopPrize',function(){
    return {
        restrict: 'E',
        templateUrl: "views/publicHtml/compop_prize.html"
    }
}).directive('compopFail',function(){
    return {
        restrict: 'E',
        templateUrl: "views/publicHtml/compop_fail.html"
    }
}).directive('tabpop',function(){
    return {
        restrict: 'E',
        templateUrl: "views/publicHtml/pop_tab.html"
    }
}).directive('tabpoppre',function(){
    return {
        restrict: 'E',
        templateUrl: "views/publicHtml/pop_tab_pre.html"
    }
}).directive('tabpopnew',function(){
    return {
        restrict: 'E',
        templateUrl: "views/publicHtml/pop_tab_new.html"
    }
}).directive('compopsuccess',function(){
    return {
        restrict: 'E',
        templateUrl: "views/publicHtml/compop_success.html"
    }
}).directive('comGetPrize',function(){
    return {
        restrict: 'E',
        templateUrl: "views/publicHtml/com_get_prize.html"
    }
}).directive('comMissPrize',function(){
    return {
        restrict: 'E',
        templateUrl: "views/publicHtml/com_miss_prize.html"
    }
}).directive('comShare',function(){
    return {
        restrict: 'E',
        templateUrl: "views/publicHtml/common_share.html"
    }
}).directive('contenteditable',function(){
    return {
        restrict:'A',
        require:'?ngModel',
        link:function(scope,element,atrrs,ngModel){
            if(!ngModel)return;
            //
            ngModel.$render=function(){
                element.html(ngModel.$viewValue||'');
            }
            element.on('blur keyup change', function() {
                scope.$apply(read);
            });
            // 
            function read() {
                var html = element.html();
                ngModel.$setViewValue(html);
            }
        }
    }
}).directive('bindChildScope',function(commonFactory){
    return {
        restrict:'A',
        require:'?ngModel',
        link:function(scope,element,attrs,ngModel){
            if(!ngModel)return;
            element.on('blur keyup change', function() {
                var valArr = attrs.bindChildScope.split(',');
                commonFactory.setScopeToChild(valArr[0],valArr[1],valArr[2],ngModel.$viewValue);
            });
        }
    }
}).directive('setToFocus',function(commonFactory){
    return {
        restrict:'A',
        link:function(scope,element,attrs,ngModel){
            element.on('mouseenter',function(){
                element.addClass('border-edit')
            });
            element.on('mouseleave',function(){
                element.removeClass('border-edit')
            });
            element.on('click',function(event){
                event.stopPropagation();
                var id = attrs.setToFocus;
                var key = attrs.setScope.split('=')[0];
                var val = attrs.setScope.split('=')[1];//数字的话'1'==1为真，true:直接传true 有值即为真，false: 传空''
                if(id){
                    parent.$('#'+id).addClass('checkBorder');
                    parent.$('#'+id).on('mouseleave',function(){
                        parent.$(this).removeClass('checkBorder');
                    })
                    commonFactory.setScopeToParent(id,key,val);
                }else{
                    commonFactory.setScopeToParent('mainHtml',key,val);
                }
            });
        }
    }
}).directive('setToDefault',function(commonFactory){
    return {
        restrict:'A',
        link:function(scope,element,attrs,ngModel){
            element.on('click',function(){
                var attrsArray = attrs.setToDefault.split(',');
                var outImgId = attrsArray[0];//外层预览img id
                var imgSrc = attrsArray[1];//图片地址
                var iframeId = attrsArray[2];//iframe id
                var innerImgId = attrsArray[3];//里层img id
                var inputId = attrsArray[4]; //外层input id

                var fileInput = document.getElementById(inputId);
                if(fileInput.outerHTML){
                    fileInput.outerHTML=fileInput.outerHTML;
                }
                else{      //FF
                    fileInput.value="";
                }

                $('#'+outImgId).attr('src',imgSrc);
                commonFactory.setWidthHeight(outImgId,imgSrc);

                var childWindow = document.getElementById(iframeId).contentWindow;
                childWindow.$('#'+innerImgId).attr('src',imgSrc);
            });
        }
    }
}).directive('setToDefaultScope',function(commonFactory){
    return {
        restrict:'A',
        link:function(scope,element,attrs,ngModel){
            element.on('click',function(){
                var attrsArray = attrs.setToDefaultScope.split(',');
                var outImgId = attrsArray[0];//外层预览img id
                var imgSrc = attrsArray[1];//图片地址
                var iframeId = attrsArray[2];//iframe id
                var innerId = attrsArray[3];//里层页面id
                var innerKey = attrsArray[4];//里层需改变的scope值
                var inputId = attrsArray[5];//外层input框id

                var fileInput = document.getElementById(inputId);
                if(fileInput.outerHTML){
                    fileInput.outerHTML=fileInput.outerHTML;
                }
                else{      //FF
                    fileInput.value="";
                }

                $('#'+outImgId).attr('src',imgSrc);
                commonFactory.setWidthHeight(outImgId,imgSrc);
                commonFactory.setScopeToChild(iframeId,innerId,innerKey,imgSrc);
                
            });
        }
    }
}).directive('commonLoading',function(commonFactory){
    return {
        restrict:'E',
        templateUrl: "views/publicHtml/commonLoading.html"
        }
}).directive('loadAnimation',function(commonFactory){
    return {
        restrict:'E',
        templateUrl: "views/publicHtml/load-animation.html"
        }
}).directive('imgErr',function(){
    return {
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {  
            $(elm).on('error',function(){
                $(elm).attr('src',attrs.imgErr);
                $(elm).onerror = null;
            })
        }  
    }
}).directive('stopPropagation',function(){
    return {
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {  
        	$(elm).on('click',function(e){
        		e.stopPropagation();
        	})
        }  
    }
});
