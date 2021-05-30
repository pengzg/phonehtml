tempApp.controller('ctr_APPversion', function($scope, $state, http, EzConfirm,
		messageFactory) {
	/**
	 * 显示图片上传
	 */
	var isImgEventExist = false;
	$scope.upImage = function($event, x, index) {
		if (!isImgEventExist) {
			isImgEventExist = true;
			$scope.ue_myeditor.addListener("afterUpfile",_afterUpfile);
		}
		var myImage = $scope.ue_myeditor.getDialog("attachment");
		myImage.open();
	};
	
	function _afterUpfile(t, arg) {
		var fileHtml = '';
        document.getElementById('upload_file_wrap').innerHTML = fileHtml;
	}
})