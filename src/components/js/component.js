var Drag = require('./drag')
var Resize = require('./resize')

//注册组件
export default (Vue) => {
  Vue.component('obj', {
    props: ['obj'],
    
    data: function () {
      var obj = this.obj;
      var mappers = {
        numbers: ['left', 'top', 'width', 'height'],
        strings: ['active', 'transform', 'visibility','zIndex']
      }
      return {
        data: obj,
        style() {
          var json = {};
          for(var key in obj){
            var value = obj[key];
             
            var isNumber = mappers.numbers.indexOf(key) != -1;
            var isString = mappers.strings.indexOf(key) != -1;

            //不在样式表范围内的字段忽略
            if(isNumber || isString){
              if(isNumber) {
                value = value + 'px';
              }
              if(key=='transform'){
                value = 'rotate(' + value +'deg)';
              }
              if(key=='zIndex'){
                key = 'z-index';
              }
              json[key] = value;
            }
          }
          return json;
        }
      }
    },
    template: '<div :class="{obj:true, active:data.active}" :style="style()"><div class="image"><img :src="data.value"></div></div>',
  });

  //注册指令
  Vue.directive('drag', {
    inserted(dv, binding) {
      //注册拖拽移动
      var drag = new Drag.Drag({
        onBegin: function (data) {

          var self = {}
          //找出选中的元素
          for(var i=0; i<objs.length; i++){
            var item = objs[i];
            if(item.active){
              self = item;
              break;
            }
          }
          self.active = true;
          /*再次循环根据zIndex找出当前层所有对象 */
          for(var i=0; i<objs.length; i++){
            var nowDom = document.getElementById('sketchpad');
            var tempIndex = nowDom.getElementsByClassName('obj')[i].style.zIndex;
            objs[i].zIndex = tempIndex;
            if(objs[i].zIndex==self.zIndex){
              objs[i].active = true;
            }
          }
          
          //选中的记录旧坐标
          objs.forEach(item => {
            if(item.active){
              item.oldLeft = item.left;
              item.oldTop = item.top;
            }
          })
        },
        onDrag: function (data) {
          var obj = binding.value.obj;
          obj.left = data.left;
          obj.top = data.top;

          var bgwidth = binding.value.bgwidth;
          //所有选中的移动
          objs.forEach(item => {
            if(item.active){
              item.left = data.x + item.oldLeft;
              item.top = data.y + item.oldTop;
              
              //如果向右移动越过画布边缘，则再加入一个相同元素，与该元素为左右闭合
              //向左移动与之类似
              if(item.left+item.width>bgwidth){
                if(item.outline==false){
                  var temp = {
                    left: item.left-bgwidth,//设定left与该元素互补
                    top: item.top,
                    width: item.width,
                    height: item.height,
                    value: item.value,
                    active: item.active,
                    transform: item.transform,
                    visibility: item.visibility,
                    zIndex: item.zIndex,
                    outline: true, //越界设为true
                    oldLeft: item.oldLeft - bgwidth,//设定oldLeft与该元素互补
                    oldTop: item.oldTop
                  };
                  pushObj(temp);
                  item.outline=true;
                }
                
              }
            }
          })
        },
        onEnd: function (data) {
          objs.forEach(item => {
            if(item.active) {
              item.oldLeft = item.left;
              item.oldTop = item.top;
            }
          })
        }
      })
      drag.register(dv);

      //注册拉伸
      var resize = new Resize.Resize({
        onBegin: function(data){
          var self = {}

          for(var i=0; i<objs.length; i++){
            var item = objs[i];
            if(item.active){
              self = item;
              break;
            }
          }
          self.active = true;
          /*再次循环根据zIndex找出当前层所有对象 */
          for(var i=0; i<objs.length; i++){
            var nowDom = document.getElementById('sketchpad');
            var tempIndex = nowDom.getElementsByClassName('obj')[i].style.zIndex;
            objs[i].zIndex = tempIndex;
            if(objs[i].zIndex==self.zIndex){
              objs[i].active = true;
            }
          }
        },
        onResize: function (data){
          objs.forEach(item=>{
            if(item.active){
              for(var key in data) {
                item[key] = data[key];
              }
            }
          })
        }
      });
      resize.register(dv);
    }
  })
}