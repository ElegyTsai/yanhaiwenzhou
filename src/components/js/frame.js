//var Utils = require('./utils')
import Material from '../vue/Material'
import PaintTool from '../vue/PaintTool'
import FileTool from '../vue/FileTool'
import Utils from '../vue/Utils'
import ImgTool from '../vue/ImgTool'
import LayerTool from '../vue/LayerTool'
import Sketchpad from '../vue/Sketchpad'
export default {
  name: 'frame',
  components: {
    Material,
    PaintTool,
    FileTool,
    Utils,
    ImgTool,
    LayerTool,
    Sketchpad
  },
  data () {
    return {
      //selected: {},
      //isSelected: false,
      /*objs: this.$store.state.objs, 
      selected: this.$store.state.selected,
      isSelected: this.$store.state.isSelected?true:false,*/
      show: true
    }
  },
  computed: {
    objs: function(){
      return this.$store.state.objs
    },
    selected: function(){
      return this.$store.state.selected
    },
    isSelected: function(){
      return this.$store.state.isSelected
    }
  },
  mounted (){
    window.objs = this.objs,
    window.addObj = this.addObj
    
  },
  methods: {
    moveSelected(){
      //this.selected = [];
      //this.$store.commit('setSelected', null);
      this.selected.active = false;
      this.$store.commit('setIsSelected', false);
      //console.log('zhuiming-canvasclick')
    },
    selectObj (ev, obj) {
      this.objs.forEach(item => {
        item.active = false;
      });
      obj.active = true;
      if(ev){
        ev.preventDefault();
      }
      //this.selected = obj;
      //this.isSelected = true;
      this.$store.commit('setSelected', obj);
      this.$store.commit('setIsSelected', true);
      //console.log('zhuiming-selectObj:', obj);
    },
    addObj (url, x, y) {
      x = x || 10;
      y = y || 10;
      var temp = {
        left: x,
        top: y,
        width: 100,
        height: 100,
        value: url,
        active: false,
        transform: 0,
        visibility: 'visible'
      };
      this.selectObj(null, temp);
      this.pushObj(temp);
      //console.log('zhuiming-addObj');
    },
    pushObj (obj) {
      //obj.id = this.getObjId();
      //this.objs.push(obj);
      this.$store.commit('pushObj', obj);
      //console.log('zhuiming-obj',obj)
    },
    /*
    getObjId(){
      return new Date().getTime() + "" + Math.floor(Math.random() * 89999 + 10000);
    },*/
    closeItem(){
      this.show = false;
      var div=document.getElementById('imgCanvas');
      div.style.width = '100%';
    }
  }
}