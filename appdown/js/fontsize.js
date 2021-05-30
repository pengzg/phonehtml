(function () {
    document.addEventListener('DOMContentLoaded', function () {
       var html = document.documentElement;
       var windowWidth = html.clientWidth;
       html.style.fontSize = windowWidth / 7.5 + 'px';
       // 等价于html.style.fontSize = windowWidth / 750 * 100 + 'px';
    }, false);
})();

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

$(function(){
    $.ajax({
      dataType: "json",
      url: '/admin/base/baseAppVersionControl/getNewVersion.action',
      data: {'source':5},
      success: function(data){
         if(data){
            // location.href = data.data.bv_down_url;
            var img = $('#codeImg').find('img')[0];
            var width = $(img).width()-10;
            $('#codeImg').qrcode({width:width,height:width,correctLevel:0,text:location.origin+'/appdown/appdown.html'});  
         }else{
            show('无法获取最新版本，请稍后再试');
         }
       },
       error: function(){
          show('无法获取最新版本，请稍后再试');
       }
    });
})

function downApp(){
  if(isWeiXin()){
    show('请点击右上角，在浏览器中打开链接');
  }else{
    $.ajax({
      dataType: "json",
      url: '/admin/base/baseAppVersionControl/getNewVersion.action',
      data: {'source':5},
      success: function(data){
        console.log(data);
         if(data){
            location.href = data.data.bv_down_url;
         }else{
            show('无法获取最新版本，请稍后再试');
         }
       },
       error: function(){
          show('无法获取最新版本，请稍后再试');
       }
    });
  }
}
function show(text){
    var pop = document.getElementById('msg');
    var content = document.getElementById('content');
    content.innerHTML = text;
    pop.style.display = 'block';
    clearmsg();
}
function clearmsg(){
    var pop = document.getElementById('msg');
    setTimeout(function(){
      pop.style.display = 'none';
    },2000)
}
