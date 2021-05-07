/**
 * @constructor resize
 */

var Resize = function (options) { //options表示当前操作
    
    this.register = function (el){
        var directions = ['nw', 'w', 'ws', 's', 'se', 'e', 'ne', 'n', 'r']
                        //西北   西    西南  南    东南  东    东北  北

        //增加元素
        //el.querySelector('.image').className += ' direction'
        directions.forEach(direction => {
            var div = document.createElement('div');
            //var div = document.querySelector('options')
            div.className = 'direction ' + direction;
            el.appendChild(div);
            //el.querySelector('.image').className += ' '+direction
        })

        var border = document.createElement('div');
        border.className = 'border';
        el.appendChild(border);
        //el.querySelector('.image').className += ' '+ 'border';

        //注册事件
        directions.forEach(direction => {
            //console.log('direction:', direction)
            var temp = el.querySelector("." + direction);
            if(direction=='r'){
                var pointA = {X:el.offsetWidth/2+el.offsetLeft,
                            Y:el.offsetHeight/2 + el.offsetTop};

                var pointB = {}; //起始点
                var pointC = {}; //结束点
            }
            temp.onmousedown = function (e){

                if(e.button != 0) return;

                var ox = e.clientX;
                var oy = e.clientY;
                var oa = parseInt(el.style.transform.replace(/[^\d]/g,' '));
                if(direction=='r'){
                    pointB.X = e.pageX;
                    pointB.Y = e.pageY;
                }
                var data = {
                    ox: ox,
                    oy: oy,
                    ow: el.offsetWidth,
                    oh: el.offsetHeight,
                    ol: el.offsetLeft,
                    ot: el.offsetTop,
                    oa: oa /**当前的角度 */
                }

                if(options && options.onBegin){
                    options.onBegin.call(el, data);
                }

                var isResize = true;
                
                window.onmousemove = function (ev){
                    if(!isResize){
                        return;
                    }
                    //console.log('zhuiming-resize-mousemove');
                    var x = ev.clientX;
                    var y = ev.clientY;
                    /**计算旋转角度 */
                    var angleA = 0;
                    if(direction=='r'){
                        pointC.X = ev.pageX;
                        pointC.Y = ev.pageY;
                        var AB = {};
                        var AC = {};
                        AB.X = pointB.X - pointA.X;
                        AB.Y = pointB.Y - pointA.Y;
                        AC.X = pointC.X - pointA.X;
                        AC.Y = pointC.Y - pointA.Y;

                        var direct = (AB.X * AC.Y) - (AB.Y * AC.X); //AB与AC叉乘求出逆时针还是顺时针旋转
                        var lengthAB = Math.sqrt(Math.pow(pointA.X - pointB.X, 2) +
                        Math.pow(pointA.Y - pointB.Y, 2)),
                            lengthAC = Math.sqrt(Math.pow(pointA.X - pointC.X, 2) +
                        Math.pow(pointA.Y - pointC.Y, 2)),
                            lengthBC = Math.sqrt(Math.pow(pointB.X - pointC.X, 2) +
                        Math.pow(pointB.Y - pointC.Y, 2));
                        var cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
                            (2 * lengthAB * lengthAC); //   余弦定理求出旋转角
                        angleA = Math.round(Math.acos(cosA) * 180 / Math.PI/2);// /2减缓旋转速度
                        var allA = 0;
                        allA = direct<0?-angleA:angleA;
                        allA += data.oa;
                        data.oa = allA%360;
                    /**end */
                    }
                    //计算width和height差值
                    var width = x - data.ox;
                    var height = y - data.oy;

                    data.width = width;
                    data.height = height;

                    /**计算旋转角度 */
                    if(direction=='r'){
                        
                    }

                    var fun = mappers[direction];
                    //console.log('zhuiming-fun:', fun);
                    if(fun){
                        //console.log('zhuiming-fun');
                        fun.call(temp, data, ev);
                    }
                }
                window.onmouseup = function (ev) {
                    isResize = false;
                    ev.stopPropagation();
                    //console.log('zhuiming-resize-mouseup');
                    if(options && options.onEnd){
                        options.onEnd.call(el);
                    }
                }
                //阻止事件冒泡
                e.stopPropagation();
            }
        })

        function setLeft(l) {

            options.onResize({left: l});
            el.style.left = l + 'px';
        }
        
        function setTop(t) {
            options.onResize({top: t});
            el.style.top = t + 'px';
        }
        
        function setWidth(w) {
            if (w < 20) {
                w = 20;
            }
            options.onResize({width: w});
            el.style.width = w + 'px';
        }
        
        function setHeight(h) {
        
            if (h < 20) {
                h = 20;
            }
            options.onResize({height: h});
            el.style.height = h + 'px';
        }

        function setRotate(angle) {
            options.onResize({transform: angle});
            el.style.transform = 'rotate(' + angle +'deg)';
        }

        var mappers = {
            s: function (data) {
                setHeight(data.oh + data.height);
            },
            e: function (data) {
                setWidth(data.ow + data.width)
            },
            w: function (data) {
                var value = data.width;
        
                var l = data.ol + value;
                var w = data.ow + Math.abs(value);
        
                if (value > 0) {
                    w = data.ow - value;
                }
        
                if (w > 20) {
                    setLeft(l);
                    setWidth(w);
                }
            },
            n: function (data) {
                var value = data.height;
        
                var t = data.ot + value;
                var h = data.oh + Math.abs(value);
        
                if (value > 0) {
                    h = data.oh - value;
                }
                if (h > 20) {
                    setHeight(h);
                    setTop(t);
                }
            },
            se: function (data) {
                mappers.s(data);
                mappers.e(data);
            },
            nw: function (data) {
                mappers.n(data);
                mappers.w(data);
            },
            ws: function (data) {
                mappers.w(data);
                mappers.s(data);
            },
            ne: function (data) {
                mappers.n(data);
                mappers.e(data);
            },
            r: function (data){
                setRotate(data.oa);
                //console.log('zhuiming-rotate:', data);
            }
        }
    }
}


exports.Resize = Resize
