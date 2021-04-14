//var Utils = require('./utils')
import Material from '../vue/Material'
import PaintTool from '../vue/PaintTool'
import FileTool from '../vue/FileTool'
import Utils from '../vue/Utils'
export default {
  name: 'frame',
  components: {
    Material,
    PaintTool,
    FileTool,
    Utils
  },
  data () {
    return {
      imgTool:[
        {url: require('@/assets/logo.png')},
        {url: require('@/assets/logo.png')},
        /*{url: require('@/assets/bigimg.png')},
        {url: require('@/assets/leaf.png')},
        {url: require('@/assets/img1.png')},
        {url: require('@/assets/img2.png')},
        {url: require('@/assets/img3.png')}*/
      ],
      selected: {},
      isSelected: false,
      objs: [], 
      show: true
    }
  },
  mounted (){
    window.objs = this.objs,
    window.addObj = this.addObj
  },
  methods: {
    selectObj (ev, obj) {
      this.objs.forEach(item => {
        item.active = false;
      });
      obj.active = true;
      if(ev){
        ev.preventDefault();
      }
      this.selected = obj;
      this.isSelected = true;
      console.log('zhuiming-selectObj');
    },
    addObj (url, x, y) {
      x = x || 10;
      y = y || 10;
      var temp = {
        left: x,
        top: y,
        width: 100,
        height: 100,
        /*value: require('../../assets/logo.png'),*/
        value: url,
        active: true
      };
      this.selectObj(null, temp);
      this.pushObj(temp);
      console.log('zhuiming-addObj');
    },
    pushObj (obj) {
      obj.id = this.getObjId();
      this.objs.push(obj);
      console.log('zhuiming-obj',obj)
    },
    getObjId(){
      return new Date().getTime() + "" + Math.floor(Math.random() * 89999 + 10000);
    },
    closeItem(){
      this.show = false;
      var div=document.getElementById('imgCanvas');
      div.style.width = '100%';
    }
  }
}