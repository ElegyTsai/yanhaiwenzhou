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
            //el.classList.add("active");
            var x = ev.clientX;
            var y = ev.clientY;

            var l = el.offsetLeft;
            var t = el.offsetTop;

            if(obj && obj.onBegin){
                obj.onBegin.call(el, {
                    left: x - l,
                    top: y - t
                })
            }
            var isDown = true;
            el.style.cursor = 'move';

            var nl = x, nt = y;

            window.onmousemove = function (ev) {
                if(!isDown) return;
                var nx = ev.clientX;
                var ny = ev.clientY;

                //计算移动后的左偏移量和上偏移量
                nl = nx - (x - l);
                nt = ny - (y - t);

                el.style.left = nl + 'px';
                el.style.top = nt + 'px';
                

                if(obj && obj.onDrag){
                    obj.onDrag.call(el, {
                        left: nl,
                        top: nt,
                        x: nx - x,
                        y: ny - y
                        /*position: 'absolute'*/
                    })
                    
                }
                
                return false;
            }

            window.onmouseup = function (ev) {
                isDown = false;
                el.style.cursor = 'default';

                if(obj && obj.onEnd) {
                    //el.classList.remove("active");
                    obj.onEnd.call(el, {
                        left: nl,
                        top: nt
                    })
                }
                return false;
            }

            ev.preventDefault(); 
        })
    }
}

exports.Drag = Drag; 