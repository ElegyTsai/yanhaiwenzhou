/**
 * drag
 * @constructor
 */
//function Drag(obj){
var Drag = function(obj){
    /**
     * @param el为节点
     */
    this.register = function (el) {
        el.addEventListener('mousedown', function (ev) {
            if(ev.button !=0){
                return; //屏蔽左键以外的按键
            }
            
            var x = ev.clientX;
            var y = ev.clientY;

            var l = el.offsetLeft;
            var t = el.offsetTop;
            //console.log('zhuiming-onBegin:x=',x,",y=",y,"l=",l,'t=',t);

            if(obj && obj.onBegin){
                obj.onBegin.call(el, {
                    left: x - l,
                    top: y - t
                })
                /*el.style.left = x + 'px';
                el.style.top = y + 'px';*/
            }
            var isDown = true;
            el.style.cursor = 'move';

            var nl = x, nt = y;

            window.onmousemove = function (ev) {
                if(!isDown) return;
                var nx = ev.clientX;
                var ny = ev.clientY;
                //console.log('zhuiming-nx=', nx, "ny=", ny);
                //计算移动后的左偏移量和上偏移量
                nl = nx - (x - l);
                nt = ny - (y - t);

                el.style.left = nl + 'px';
                el.style.top = nt + 'px';
                //console.log('zhuiming-el-begin:', el);
                

                if(obj && obj.onDrag){
                    obj.onDrag.call(el, {
                        left: nl,
                        top: nt,
                        x: nx - x,
                        y: ny - y
                        /*position: 'absolute'*/
                    })
                    /*
                    var imgChild = el.children[0].firstElementChild;
                    /*el.style.left = nx + 'px';
                    el.style.top = ny + 'px';
                    el.style.width = 50 +'px';
                    el.style.height = 30 + 'px';
                    imgChild.style.position = 'absolute';
                    imgChild.style.left = nx + 'px';
                    imgChild.style.top = ny + 'px';*/
                    console.log('zhuiming-el-children:', el.children[0].firstElementChild);
                }
                
                return false;
            }

            window.onmouseup = function (ev) {
                isDown = false;
                el.style.cursor = 'default';

                if(obj && obj.onEnd) {
                    obj.onEnd.call(el, {
                        left: nl,
                        top: nt
                    })
                    /*el.style.left = ev.clientX + 'px';
                    el.style.top = ev.clientY+ 'px';
                    console.log('zhuiming-onEnd:el=', el);*/
                }
                return false;
            }

            ev.preventDefault(); 
        })
    }
}

exports.Drag = Drag; 