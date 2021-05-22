//注册组件
//注册指令

//import { Resize } from './resize';

//function componentInit(){
var Drag = require('./drag')
var Resize = require('./resize')


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
          //console.log('zhuiming-obj', obj);
          for(var key in obj){
            //console.log('key:', key);
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
              
              //console.log('key:', key);
            }
          }
          //console.log('json:', json);
          return json;
        }
      }
    },
    template: '<div :class="{obj:true, active:data.active}" :style="style()"><div class="image"><img :src="data.value"></div></div>',
    computed: {
      bgWidth: function(){
        return this.$store.state.bgWidth;
      }
      
    },
  });

  Vue.directive('drag', {
    inserted(dv, binding) {
      //注册拖拽移动
      var drag = new Drag.Drag({
        onBegin: function (data) {

          //var id = parseInt(dv.getAttribute('data-id'));
          var self = {}
          //console.log('app.objs:', app.objs);

          //for(var i=0; i<objs.length; i++){
          for(var i=0; i<objs.length; i++){
            var item = objs[i];
            //console.log('67-item:',item);
            if(item.active){
              self = item;
              break;
            }
          }
          self.active = true;
          /*再次循环找出当前层所有对象 */
          for(var i=0; i<objs.length; i++){
            var nowDom = document.getElementById('sketchpad');
            var tempIndex = nowDom.getElementsByClassName('obj')[i].style.zIndex;
            objs[i].zIndex = tempIndex;
            //console.log('obj-',i, 'z-index',objs[i].zIndex);
            if(objs[i].zIndex==self.zIndex){
              objs[i].active = true;
            }
          }
          

          //选中的记录旧坐标
          objs.forEach(item => {
            
            if(item.active){
              //console.log('85-item.active:',item)
              item.oldLeft = item.left;
              item.oldTop = item.top;
            }
          })
          //console.log('zhuiming-dragonBegin');
        },
        onDrag: function (data) {
          var obj = binding.value.obj;
          //console.log('zhuiming-onDrag-binding.value:',binding.value);
          obj.left = data.left;
          obj.top = data.top;

          var bgwidth = binding.value.bgwidth;
          //console.log('zhuiming-bgwidth:', bgwidth);
          //所有选中的移动，不包括当前（？？）
          //console.log('objs:', objs);
          objs.forEach(item => {
            //console.log('item:',item);
            //if(item.active && item != obj){
            if(item.active){
              //console.log('acive!!!');
              item.left = data.x + item.oldLeft;
              item.top = data.y + item.oldTop;
              
              //console.log('zhuiming-item.value:',item.value,';item.left=:', item.left,";item.top=", item.top);
              //console.log('zhuiming-item.left:', item.left);
              //console.log('zhuiming-bgwidth:', bgwidth);
              if(item.left+item.width>bgwidth){
                //console.log('outline:',item.left-bgwidth);
                //item.outline = true;
                //console.log('outline:', item.outline)
                //this.$store.commit('pushObj', obj);
                //console.log('component-zIndex:',item.zIndex);
                if(item.outline==false){
                  var temp = {
                    left: item.left-bgwidth,
                    top: item.top,
                    width: item.width,
                    height: item.height,
                    value: item.value,
                    active: item.active,
                    transform: item.transform,
                    visibility: item.visibility,
                    zIndex: item.zIndex,
                    outline: true,
                    /*id: item.id,*/
                    oldLeft: item.oldLeft - bgwidth,
                    oldTop: item.oldTop
                  };
                  //var temp = Object.assign({}, item);
                  //temp.left = 10;
                  //console.log('item:', item);
                  //console.log('temp:',temp);
                  pushObj(temp);
                  item.outline=true;
                  //console.log('index',1);
                }
                
              }
              //console.log('zhuiming-bgWidth:',item.bgWidth);
            }
          })
          //console.log('zhuiming-dragonDrag')
        },
        onEnd: function (data) {
          objs.forEach(item => {
            if(item.active) {
              item.oldLeft = item.left;
              item.oldTop = item.top;
            }
          })
          //console.log('zhuiming-dragonEnd')
        }
      })
      drag.register(dv);

      //注册拖债拉伸
      var resize = new Resize.Resize({
        onBegin: function(data){
          var self = {}
          //console.log('app.objs:', app.objs);

          //for(var i=0; i<objs.length; i++){
          for(var i=0; i<objs.length; i++){
            var item = objs[i];
            //console.log('67-item:',item);
            if(item.active){
              self = item;
              break;
            }
          }
          self.active = true;
          /*再次循环找出当前层所有对象 */
          for(var i=0; i<objs.length; i++){
            var nowDom = document.getElementById('sketchpad');
            var tempIndex = nowDom.getElementsByClassName('obj')[i].style.zIndex;
            objs[i].zIndex = tempIndex;
            //console.log('obj-',i, 'z-index',objs[i].zIndex);
            if(objs[i].zIndex==self.zIndex){
              objs[i].active = true;
            }
          }
        },
        onResize: function (data){
          objs.forEach(item=>{
            if(item.active){
              //console.log('item-active',item);
              for(var key in data) {
                //binding.value.obj[key] = data[key];
                item[key] = data[key];
              }
            }
          })
          /*for(var key in data) {
            binding.value.obj[key] = data[key];
          }*/
        }
      });
      resize.register(dv);
    }
  })
}