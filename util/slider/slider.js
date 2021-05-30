function createSlider() {
    //拼图
    var jigsaw = $('#jigsaw');
    var jigsawImg = $('#jigsaw_img');
    // 拼图起始位置左边距
    var jigsawLeftFinal = jigsawImg.css('left');
    var jigsawLeft = jigsawImg.css('left');
    var jigsaw_img_white = $('#jigsaw_img_white');
    var randomleft = getRandom(60, 220);

    //拼图图片
    var imgArray = ['img/login/spring.jpg', 'img/login/summer.jpg', 'img/login/autumn.jpg', 'img/login/winter.jpg']
    var imgIdx = getRandom(0, 3);

    jigsaw.css('background', 'url(../../' + imgArray[imgIdx] + ') no-repeat');

    jigsawLeftFinal = jigsawLeft.substr(0, jigsawLeft.length - 2);
    jigsawLeft = jigsawLeft.substr(0, jigsawLeft.length - 2);
    jigsawLeft = jigsawLeft - randomleft;

    jigsawImg.css('left', jigsawLeft);

    var obj = { //声明一个命名空间，或者称为对象
        $: function(id) {
            return document.querySelector(id);
        },
        on: function(el, type, handler) {
            // el.addEventListener(type, handler, false);
            // type = getType(type);
            if (el.addEventListener) {
                el.addEventListener(type, handler, false);
            } else if (el.attachEvent) {
                el.attachEvent("on" + type, handler);
            } else {
                el["on" + type] = handler;
            }
        },
        off: function(el, type, handler) {
            // el.removeEventListener(type, handler, false);
            // type = getType(type);
            if (el.removeEventListener) {
                el.removeEventListener(type, handler, false);
            } else if (el.detachEvent) {
                el.detachEvent("on" + type, handler);
            } else {
                el["on" + type] = null;
            }
        }
    };

    function getType(type) {
        var isMobile = 'ontouchmove' in document;
        if (!isMobile) {
            return type;
        }
        if (type == 'mouseup') {
            return 'touchend'
        }
        if (type == 'mousedown') {
            return 'touchstart'
        }
        if (type == 'mousemove') {
            return 'touchmove'
        }
    }
    //封装一个滑块类
    function Slider() {
        var args = arguments[0];
        for (var i in args) {
            this[i] = args[i]; //一种快捷的初始化配置
        }
        //直接进行函数初始化，表示生成实例对象就会执行初始化
        this.init();
        return this;
    }
    Slider.prototype = {
        constructor: Slider,
        init: function() {
            this.getDom();
            this.dragBar(this.handler);
        },
        reset: function() {
            //更新图片
            imgIdx = getRandom(0, 3);
            jigsaw.css('background', 'url(../../' + imgArray[imgIdx] + ') no-repeat');

            this.handler.classList.remove('handler_ok_bg');
            this.slider.classList.remove('slide_ok');
            this.bg.classList.add('ani');
            this.handler.classList.add('ani');
            jigsawImg.addClass('ani');
            this.bg.style.width = 0;
            this.handler.style.left = 0;
            jigsaw.removeClass('jigsaw_active');
            (function(that) {
                setTimeout(function() {
                    that.bg.classList.remove('ani');
                    that.handler.classList.remove('ani');
                    jigsawImg.removeClass('ani');
                }, 300);
            })(this)

            randomleft = getRandom(60, 220);
            jigsawLeft = jigsawLeftFinal - randomleft;

            clearCanvas('jigsaw_img');
            clearCanvas('jigsaw_img_white');
            drawJigsaw('jigsaw_img');
            drawJigsaw('jigsaw_img_white', 'white');
            jigsawImg.css('left', parseInt(jigsawLeft));

        },
        getDom: function() {
            this.slider = obj.$('#' + this.id);
            this.handler = obj.$('.handler');
            this.bg = obj.$('.drag_bg');
        },
        dragBar: function(handler) {
            var that = this,
                startX = 0,
                lastX = 0,
                doc = document,
                width = this.slider.offsetWidth,
                max = width - handler.offsetWidth,
                maxJigsaw = -parseInt(jigsawLeft);
            drag = {
                down: function(e) {
                    var e = e || window.event;
                    that.slider.classList.add('unselect');
                    startX = e.clientX - handler.offsetLeft;
                    obj.on(doc, 'mousemove', drag.move);
                    obj.on(doc, 'mouseup', drag.up);
                    maxJigsaw = -parseInt(jigsawLeft);
                    return false;
                },
                move: function(e) {
                    var e = e || window.event;
                    lastX = e.clientX - startX;
                    lastX = Math.max(0, Math.min(max, lastX)); //这一步表示距离大于0小于max，巧妙写法


                    that.bg.style.width = lastX + 'px';
                    handler.style.left = lastX + 'px';

                    jigsawImg.css('left', parseInt(jigsawLeft) + parseInt(lastX));

                    if (lastX >= (maxJigsaw - 10) && lastX <= (maxJigsaw + 10)) {
                        handler.classList.add('handler_ok_bg');
                        that.slider.classList.add('slide_ok');
                        jigsaw.addClass('jigsaw_active');
                        return;
                    } else {
                        handler.classList.remove('handler_ok_bg');
                        that.slider.classList.remove('slide_ok');
                        jigsaw.removeClass('jigsaw_active');
                    }

                },
                up: function(e) {
                    var e = e || window.event;
                    that.slider.classList.remove('unselect');
                    if ((lastX < (maxJigsaw - 10) || lastX > (maxJigsaw + 10)) && (lastX <= max)) {
                        that.reset();
                    }
                    if (lastX >= (maxJigsaw - 10) && lastX <= (maxJigsaw + 10)) {
                        that.callback(); //执行回调函数
                        obj.off(doc, 'mousemove', drag.move);
                        obj.off(doc, 'mouseup', drag.up);
                        return;
                    }
                    obj.off(doc, 'mousemove', drag.move);
                    obj.off(doc, 'mouseup', drag.up);
                }
            };
            obj.on(handler, 'mousedown', drag.down);
        }
    };
    //绘制拼图
    function drawJigsaw(id, color) {
        var canvas = document.getElementById(id);
        var context = canvas.getContext("2d");

        var oprtns = new Array(
            "source-over",
            "destination-over",
            "source-in",
            "destination-in",
            "source-out",
            "destination-out",
            "source-atop",
            "destination-atop",
            "lighter",
            "xor",
            "copy"
        );
        var img = new Image();
        img.src = imgArray[imgIdx];

        img.onload = function() {
            imgPattern = context.createPattern(img, 'no-repeat');
            //蓝色矩形
            if (color) {
                context.fillStyle = color;
            } else {
                context.fillStyle = imgPattern;
            }
            context.fillRect(0 + randomleft, 20, 50, 50);
            //设置组合方式 
            context.globalCompositeOperation = oprtns[5];
            //设置新图形（圆形）下
            context.beginPath();
            context.arc(25 + randomleft, 63, 9, 0, Math.PI * 2, false);
            context.fill();

            //设置新图形（圆形）左
            context.beginPath();
            context.arc(7 + randomleft, 41, 9, 0, Math.PI * 2, false);
            context.fill();

            context.globalCompositeOperation = oprtns[0];
            //设置新图形（圆形）上
            context.beginPath();
            context.arc(26 + randomleft, 13, 9, 0, Math.PI * 2, false);
            context.fill();

            //设置新图形（圆形）右
            context.beginPath();
            context.arc(57 + randomleft, 44, 9, 0, Math.PI * 2, false);
            context.fill();
            $('#' + id).show();
        }

    }
    //清除画布
    function clearCanvas(id) {
        $('#' + id).hide();
        var c = document.getElementById(id);
        var cxt = c.getContext("2d");
        cxt.clearRect(0, 0, c.width, c.height);
    }
    drawJigsaw('jigsaw_img');
    drawJigsaw('jigsaw_img_white', 'white');

    function getRandom(n, m) {
        var range = m - n;
        var num = Math.random() * range + n;
        return Math.round(num)
    }

    return Slider;
}

tempApp.factory('sliderFactory', function() {
    return {
        createSlider:createSlider
    }
});