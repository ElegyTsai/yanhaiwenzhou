//注册组件
//注册指令
//function componentInit(){
var Drag = require('./drag')


export default (Vue) => {
  Vue.component('obj', {
    props: ['obj'],
    data: function () {
      var obj = this.obj;

      var mappers = {
        numbers: ['left', 'top', 'width', 'height'],
        strings: ['active']
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

              json[key] = value;
            }
          }
          return json;
        }
      }
    },
    template: '<div :class="{obj:true, active:data.active}" :style="style()"><div calss="image"><img :src="data.value"></div></div>'
  });

  Vue.directive('drag', {
    inserted(dv, binding) {
      var drag = new Drag.Drag({
        onBegin: function (data) {

          var id = parseInt(dv.getAttribute('data-id'));
          var self = {}
          for(var i=0; i<objs.length; i++){
            var item = objs[i];
            if(item.active){
              self = item;
              break;
            }
          }
          self.active = true;

          //选中的记录旧坐标
          objs.forEach(item => {
            if(item.active){
              item.oldLeft = item.left;
              item.oldTop = item.top;
            }
          })
          console.log('zhuiming-dragonBegin');
        },
        onDrag: function (data) {
          var obj = binding.value.obj;
          //console.log('zhuiming-onDrag-obj:',obj);
          obj.left = data.left;
          obj.top = data.top;

          //所有选中的移动，不包括当前（？？）
          objs.forEach(item => {
            if(item.active && item == obj){
              item.left = data.x + item.oldLeft;
              item.top = data.y + item.oldTop;
              //console.log('zhuiming-item.value:',item.value,';item.left=:', item.left,";item.top=", item.top);
        
            }
          })
          console.log('zhuiming-dragonDrag')
        },
        onEnd: function (data) {
          objs.forEach(item => {
            if(item.active) {
              item.oldLeft = item.left;
              item.oldTop = item.top;
            }
          })
          console.log('zhuiming-dragonEnd')
        }
      })
      drag.register(dv);
    }
  })
}